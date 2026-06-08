# EXPLICACIÓN COMPLETA DEL FLUJO DE AUTENTICACIÓN Y RUTAS

##  Resumen Rápido

Cuando el usuario abre la app:

1. **App.jsx** es la "puerta principal" que decide qué mostrar
2. Si NO está logueado → muestra **PreLoguin** (login/registro)
3. Si ESTÁ logueado → muestra **Dashboard** (página principal)
4. Todo se sincroniza automáticamente con Supabase

---

## 🔄 Flujo Detallado

### **Paso 1: Usuario abre la app**

```
┌─────────────────────────────────┐
│  Usuario abre: brota.com        │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  Se ejecuta App.jsx             │
│  (El componente principal)       │
└─────────────────────────────────┘
```

---

### **Paso 2: App.jsx verifica si hay sesión**

```jsx
// En App.jsx hay un useEffect que se ejecuta al cargar:

useEffect(() => {
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null); // Guardamos el usuario
    setLoading(false);
  };
  checkUser();
}, []); // [] = ejecutar solo una vez al cargar
```

**¿Qué pasa aquí?**
- `supabase.auth.getSession()` pregunta: "¿Hay alguien logueado?"
- Si SÍ: `setUser(usuario)` guarda sus datos
- Si NO: `setUser(null)` (vacío)
- Mientras preguntamos: `loading = true` (mostrar "Cargando...")
- Cuando termina: `loading = false`

---

### **Paso 3: App.jsx renderiza según el estado**

```jsx
// Si aún estamos investigando, mostrar pantalla de carga
if (loading) return <div>Cargando...</div>;

// Si está logueado
if (user) return <Dashboard user={user} />;

// Si NO está logueado
return <PreLoguin />;
```

**¿Qué significa?**
- ✅ `user != null` y `loading = false` → Ve **Dashboard**
- ❌ `user == null` y `loading = false` → Ve **PreLoguin**
- ⏳ `loading = true` → Ve pantalla de carga

---

## 📌 ESCENARIO 1: Usuario sin cuenta (primero abre la app)

```
┌────────────────────────────────────────────────────────────┐
│ 1. App.jsx verifica sesión                                 │
│    Resultado: user = null (no hay sesión guardada)         │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 2. Muestra PreLoguin (página de login/registro)            │
│    Usuario ve: formulario de autenticación                 │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 3. Usuario hace click en "Regístrate"                      │
│    - Cambia a modo "signup"                                │
│    - Aparecen campos: nombre, apellido, email, password    │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 4. Usuario llena el formulario y hace click "Crear cuenta" │
│    Frontend valida: ✓ email válido, ✓ pass >= 6 chars     │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 5. Se envía a Supabase:                                    │
│    - supabase.auth.signUp({ email, password })            │
│    - Supabase crea usuario en auth.users                   │
│    - Devuelve user.id (ID único del usuario)              │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 6. Se crea perfil en la tabla PERFILES_USUARIO:            │
│    - INSERT { user_id, nombre, apellido }                  │
│    - Vinculamos el usuario de auth con sus datos          │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 7. Supabase auto-loguea al usuario                        │
│    - La sesión se guarda en el navegador (cookie/storage) │
│    - onAuthStateChange detecta el cambio                   │
│    - setUser() actualiza con los datos del usuario        │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 8. App.jsx detecta user != null                            │
│    Redirige automáticamente a: <Dashboard />              │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 9. Dashboard carga:                                        │
│    - Obtiene el perfil de PERFILES_USUARIO                 │
│    - Muestra: nombre, edad, ciudad, etc.                   │
│    - Usuario ve su página principal                        │
└────────────────────────────────────────────────────────────┘
```

---

## 📌 ESCENARIO 2: Usuario con cuenta (login)

```
┌────────────────────────────────────────────────────────────┐
│ 1. Usuario abre la app                                     │
│    App.jsx verifica sesión: user = null                    │
│    (La sesión anterior expiró o navegador se limpió)      │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 2. Muestra PreLoguin en modo "login"                       │
│    Usuario ve: campos de email y password                  │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 3. Usuario escribe email y contraseña, click "Ingresar"    │
│    Frontend valida: ✓ email válido, ✓ password >= 6       │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 4. Se envía a Supabase:                                    │
│    - supabase.auth.signInWithPassword({ email, password }) │
│    - Supabase verifica credenciales en auth.users          │
│    - Si son correctas: crea sesión                        │
│    - Si son incorrectas: devuelve error                    │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 5. Si error: mostrar mensaje ("Credenciales inválidas")    │
│    Si éxito: onAuthStateChange detecta el cambio          │
│    - setUser() actualiza con datos del usuario            │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 6. App.jsx redirige a: <Dashboard />                       │
└────────────────────────────────────────────────────────────┘
```

---

## 📌 ESCENARIO 3: Usuario cierra sesión

```
┌────────────────────────────────────────────────────────────┐
│ 1. Usuario hace click "Cerrar Sesión" en Dashboard         │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 2. Se ejecuta: supabase.auth.signOut()                     │
│    - Borra la sesión del navegador                         │
│    - Supabase invalida el token                            │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 3. onAuthStateChange detecta: SIGNED_OUT                   │
│    - setUser(null)                                         │
└────────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────────┐
│ 4. App.jsx detecta user == null                            │
│    Muestra PreLoguin (volverá a pedir login)               │
└────────────────────────────────────────────────────────────┘
```

---

## 🔐 ¿Dónde está el usuario guardado?

Cuando el usuario se loguea, la sesión se guarda en **3 lugares**:

### 1️⃣ **Supabase (el servidor)**
```
Base de datos Supabase:
├── auth.users (tabla de autenticación)
│   └── user_id, email, password_hash, ...
└── PERFILES_USUARIO (tabla de perfil)
    └── user_id, nombre, apellido, edad, ciudad, ...
```

### 2️⃣ **Navegador del usuario (localStorage/sessionStorage)**
```
Navegador (en el disco del usuario):
├── supabase.auth.* (tokens de sesión)
└── Datos temporales
```

### 3️⃣ **Memoria del navegador (React state)**
```
React en tiempo real:
└── user = { id, email, ... }
```

Cuando el usuario recarga la página (F5):
- React borra su `state` (paso 3)
- Pero los datos siguen en Supabase y localStorage (pasos 1 y 2)
- App.jsx pregunta: "¿Hay sesión guardada?" → SÍ
- Se recupera automáticamente

---

## 🛡️ Validación: Frontend vs Backend

### **Frontend (PreLoguin.jsx)**
- Valida FORMATO: email válido, password >= 6 caracteres, campos no vacíos
- Esto es para UX rápida (feedback inmediato)
- NO es seguro por sí solo

### **Backend (Supabase)**
- Valida SEGURIDAD: verifica credenciales reales, compara password hash, rate limiting
- Esta es la autoridad final

**Flujo:**
```
Frontend:     Email válido? ✓
                    ↓
Si NO →  Mostrar error sin enviar

Si SÍ →    Enviar a Supabase
                    ↓
Backend:      Email existe en BD? ✓
             Password hash coincide? ✓
                    ↓
Si NO →   Error 401 "Credenciales inválidas"
Si SÍ →   Crear sesión ✓
```

---

## 📋 Archivos principales y su función

| Archivo | Función |
|---------|---------|
| **App.jsx** | Enrutador principal. Verifica autenticación y decide qué mostrar |
| **PreLoguin.jsx** | Página de login/registro. Valida formato y envía a Supabase |
| **Dashboard.jsx** | Página del usuario logueado. Carga y muestra su perfil |
| **config/supabase.js** | Configura conexión con Supabase (frontend) |
| **backend/.env** | Variables de Supabase (backend) |

---

## 🔄 onAuthStateChange: El "observador" de cambios

```javascript
supabase.auth.onAuthStateChange((event, session) => {
  // Este callback se ejecuta CADA VEZ que el estado de auth cambia
  // Por ejemplo:
  // - Usuario se loguea ✅
  // - Usuario se desloguea ❌
  // - Token se refresca 🔄
});
```

**¿Cuándo se ejecuta?**
- Al cargar la app (verifica si hay sesión guardada)
- Cuando el usuario hace login
- Cuando el usuario hace logout
- Cuando el token expira y se refresca
- En otro navegador/pestaña si usas el mismo usuario

---

## 🎯 Conclusión

La arquitectura es así:

```
Usuario abre app
       ↓
App.jsx pregunta: "¿Hay sesión?"
       ↓
├─ SI  → Dashboard (usuario autenticado)
├─ NO  → PreLoguin (pedir credenciales)
└─ CARGANDO → Spinner
```

Cuando hay cambios de autenticación, `onAuthStateChange` detecta automáticamente y **React actualiza la UI**.

**Esto es lo que llamamos "reactividad": cuando los datos cambian, la UI se actualiza automáticamente.**

---

## 💡 Para tu equipo

**Dice a tu compañero de diseño:**
> Tu trabajo es diseñar la página del Dashboard.jsx. Ya tiene toda la lógica de autenticación integrada. Solo necesitas reemplazar la zona que dice "Área de Diseño Personalizado" con tus componentes visuales. Usa Tailwind CSS y consulta la guía en GUIA_DISEÑO.js.

**Dice a tu compañero de backend:**
> Necesitamos endpoints seguros que verifiquen contraseñas (bcrypt/argon2), validen datos contra la BD y hagan rate limiting. El frontend ya envía los datos validados, pero no confíes en eso: revalida TODO en el backend. Usa Supabase admin SDK desde Node.js.

---

¿Alguna parte que no está clara? Pregunta y te lo explico más detallado 🚀
