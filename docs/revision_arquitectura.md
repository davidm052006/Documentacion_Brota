# Revisión de calidad de código y arquitectura

---

## Resumen ejecutivo

El proyecto tiene una base sólida en algunas áreas (auth, test vocacional, service layer) pero el panel admin que acabamos de construir tiene un error arquitectónico grave: **el CRUD va directo al frontend → Supabase, saltándose el backend**. El backend ya existe, tiene la `SERVICE_ROLE_KEY` y el patrón correcto, solo falta conectarlo.

---

## 1. Problemas críticos

### 1.1 El admin CRUD no pasa por el backend

**Estado actual (incorrecto):**
```
UsuariosSection.jsx  →  supabase.from('perfiles_usuario').update()  →  Supabase
```

**Estado correcto:**
```
UsuariosSection.jsx  →  adminService.js  →  fetch('/api/admin/...')  →  adminController.js  →  supabase (SERVICE_KEY)
```

Por qué importa:
- Con ANON_KEY no se puede crear ni eliminar usuarios de `auth.users` (requiere SERVICE_KEY)
- La autorización depende 100% de RLS, que ya demostró tener bugs (la recursión infinita)
- No hay validación de negocio (¿puede un orientador volverse admin? ¿quién lo decide?)
- No hay audit log de quién cambió qué

### 1.2 `backend/src/routes/admin.js` está vacío

El archivo existe, crea el cliente de Supabase con `SERVICE_ROLE_KEY`, pero **no define ni una sola ruta**. El backend de admin no hace nada.

```js
// admin.js — lo que hay ahora (solo 8 líneas)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
// ... nada más
```

### 1.3 El backend no verifica identidad en las rutas de perfil

`perfilService.js` llama al backend así:
```js
fetch(`${API_URL}/api/perfil/resultado`, { method: 'POST', body: ... })
```

No envía ningún header de autorización. El backend acepta cualquier request sin saber quién lo hace. Cualquiera que conozca la URL puede guardar resultados para cualquier `perfilUsuarioId`.

### 1.4 `requireAdmin` en el backend nunca se exporta ni se usa

En `automiddlewares.js`:
```js
module.exports = verifyToken;   // ← solo exporta verifyToken

async function requireAdmin(...) { ... }  // ← definida pero no exportada, nunca usada
```

---

## 2. Problemas de arquitectura media

### 2.1 Patrón inconsistente: a veces backend, a veces Supabase directo

| Operación | Flujo actual |
|-----------|-------------|
| Guardar resultado del test | ✅ Frontend → Backend |
| Leer cuestionario | ✅ Frontend → Supabase (datos públicos, OK) |
| Leer perfil de usuario (Dashboard) | ⚠️ Frontend → Supabase directo |
| Admin CRUD usuarios | ❌ Frontend → Supabase directo (debería ir por backend) |

No hay una regla clara. El patrón que sí funciona bien (y que ya existe en `perfilService.js`) debería aplicarse al admin.

### 2.2 `calcularResultado` es lógica de negocio en un componente de UI

`TestVocacional.jsx` línea 13-39: la función que calcula el perfil vocacional vive dentro del componente de React. Si hay un bug en el algoritmo, el resultado que se guarda en la DB puede ser incorrecto y es difícil de probar o corregir sin tocar la UI.

Esta función debería estar en el backend (`perfilController.js` ya hace cálculo similar con `calcularPorcentajes`).

### 2.3 `ProtectedRoute.jsx` existe pero nunca se usa

El componente está creado pero `App.jsx` hace sus propias verificaciones manuales con `puedeAcceder`. La ruta de admin ni siquiera verifica el rol en el router — cualquier usuario logueado puede navegar a `/dashboard/admin` (el check de rol está dentro del componente, no en la ruta).

### 2.4 `perfiles_usuario` y `perfiles` son dos queries + merge en cliente

Para mostrar un usuario con su rol se hacen dos queries separadas y se unen en el componente:
```js
// Query 1
const { data: perfilesData } = await supabase.from('perfiles_usuario').select('*')
// Query 2  
const { data: rolesData } = await supabase.from('perfiles').select('id, rol')
// Merge manual
const merged = perfilesData.map(u => ({ ...u, rol: rolesMap[u.user_id] }))
```

Esto debería ser un JOIN en el backend o una view en Supabase.

---

## 3. Problemas de calidad de código

### 3.1 `UsuariosSection.jsx` hace demasiado (~400 líneas)

Un solo archivo mezcla:
- Fetching de datos (READ)
- Lógica de paginación
- Lógica de filtrado
- Estado de 4 modales
- Estado del formulario
- Las 4 operaciones CRUD
- 3 componentes auxiliares (`Campo`, `Detalle`, los modales inline)

Debería separarse en: hook de datos + componentes de modal.

### 3.2 Dos updates secuenciales sin transacción en `guardarEdicion`

```js
// Si este tiene éxito...
await supabase.from('perfiles_usuario').update({...}).eq('id', id)
// ...y este falla, los datos quedan inconsistentes
await supabase.from('perfiles').update({ rol }).eq('id', user_id)
```

No hay rollback. El nombre del usuario se actualiza pero el rol no, o viceversa, sin que el admin se entere.

### 3.3 `automiddlewares.js` tiene nombre genérico y mezcla dos middlewares sin relación

Un archivo llamado `automiddlewares` que exporta `verifyToken` (JWT) y tiene `requireAdmin` (Supabase) sin exportar. Los nombres no dicen qué hacen.

### 3.4 `admin.js` crea su propio cliente Supabase en vez de importar `config/supabase.js`

```js
// admin.js (duplicado)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// config/supabase.js (ya existe para esto)
module.exports = supabase
```

---

## 4. Lo que está bien (no tocar)

- **`perfilService.js`** — el patrón correcto: service layer en frontend que llama al backend con `fetch`. Replicar este patrón para admin.
- **`useAuth.js`** — hook que abstrae correctamente la lógica de auth y alterna entre real/demo.
- **`authService.js` / `authServiceDemo.js`** — patrón de alternancia real/demo limpio.
- **`perfilController.js`** — estructura de controller bien organizada con manejo de errores consistente.
- **`calcularPorcentajes` en backend** — lógica de negocio correctamente ubicada en el servidor.
- **Patrón `{ success, error, data }`** — respuesta consistente en todos los services.

---

## 5. Plan de corrección (en orden de prioridad)

### Prioridad 1 — Backend admin (bloquea el CRUD real)

**Crear `backend/src/controllers/adminController.js`:**
```
GET    /api/admin/usuarios           → listar con rol incluido (JOIN en servidor)
PATCH  /api/admin/usuarios/:id       → actualizar perfil + rol (una sola operación atómica)
DELETE /api/admin/usuarios/:id       → eliminar perfiles_usuario + auth.users
POST   /api/admin/usuarios           → crear usuario (admin.createUser de Supabase)
GET    /api/admin/stats              → conteos de todas las tablas
```

Usar el cliente con `SERVICE_ROLE_KEY` que ya está en `config/supabase.js`.

**Agregar middleware de verificación de admin** a todas estas rutas:
```js
router.use(verificarAdmin)  // verifica token de Supabase + rol = 'admin'
```

### Prioridad 2 — Frontend admin service

**Crear `frontend/src/services/adminService.js`:**
```js
export const getUsuarios = (pagina) => fetch('/api/admin/usuarios?pagina=...')
export const updateUsuario = (id, data) => fetch(`/api/admin/usuarios/${id}`, { method: 'PATCH', ... })
export const deleteUsuario = (id) => fetch(`/api/admin/usuarios/${id}`, { method: 'DELETE', ... })
```

Siguiendo exactamente el patrón de `perfilService.js`.

**Actualizar `UsuariosSection.jsx`** para que use `adminService` en vez de Supabase directo.

### Prioridad 3 — Enviar token en requests al backend

```js
// En adminService.js y perfilService.js
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token

fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

El backend ya tiene `verifyToken` para validarlo, solo hay que usarlo.

### Prioridad 4 — Separar `UsuariosSection.jsx`

```
sections/UsuariosSection.jsx     → solo UI: tabla + botones + apertura de modales
sections/usuarios/
  useUsuarios.js                 → hook: fetch, paginación, filtrado, CRUD calls
  ModalVer.jsx
  ModalEditar.jsx
  ModalEliminar.jsx
  ModalNuevo.jsx
```

---

## 6. SQL pendiente en Supabase

Para que UPDATE y DELETE funcionen aunque sea temporalmente desde el frontend:

```sql
-- Admins pueden leer, actualizar y eliminar cualquier perfil de usuario
CREATE POLICY "admins gestionan perfiles_usuario" ON perfiles_usuario
FOR ALL USING (public.es_admin());

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "usuarios actualizan propio" ON perfiles_usuario
FOR UPDATE USING (auth.uid() = user_id);
```
