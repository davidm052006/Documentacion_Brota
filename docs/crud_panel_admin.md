# CRUD — Panel de Administración

## Cómo está implementado

Cada sección del panel (Usuarios, Oportunidades, etc.) maneja su propio estado y sus propias llamadas a Supabase. El componente `Modal.jsx` es genérico y reutilizable en todas las secciones.

---

## Las 4 operaciones

### READ — Leer
**Qué hace:** trae los registros de Supabase con paginación server-side.  
**Cómo:** `supabase.from('tabla').select('*', { count: 'exact' }).range(desde, hasta)`  
- `count: 'exact'` devuelve el total de filas para calcular las páginas  
- `.range(desde, hasta)` trae solo los registros de la página actual (no trae todo)  
- Para usuarios se hacen 2 queries: `perfiles_usuario` + `perfiles` (roles), luego se unen con un mapa

### CREATE — Crear
**Qué hace:** crea un nuevo usuario en el sistema.  
**Estado actual:** el modal existe pero el botón está deshabilitado.  
**Por qué:** crear un usuario en Supabase Auth requiere la `SERVICE_ROLE_KEY`, que solo está en el backend. El frontend con `ANON_KEY` no puede hacerlo.  
**Pendiente:** implementar `POST /api/admin/usuarios` en el backend que use `supabase.auth.admin.createUser()`.

### UPDATE — Editar
**Qué hace:** actualiza los datos del perfil y/o el rol del usuario.  
**Cómo:** se hacen 2 updates separados:
1. `supabase.from('perfiles_usuario').update({...}).eq('id', id)` — datos del perfil  
2. `supabase.from('perfiles').update({ rol }).eq('id', user_id)` — rol del usuario  

**RLS requerida en Supabase:**
```sql
CREATE POLICY "admins actualizan perfiles_usuario" ON perfiles_usuario
FOR UPDATE USING (public.es_admin());

CREATE POLICY "admins actualizan perfiles" ON perfiles
FOR UPDATE USING (public.es_admin());
```

### DELETE — Eliminar
**Qué hace:** elimina el registro de `perfiles_usuario` (los datos del perfil).  
**Cómo:** `supabase.from('perfiles_usuario').delete().eq('id', id)`  
**Importante:** el usuario de Supabase Auth (`auth.users`) NO se elimina — eso también requiere la `SERVICE_ROLE_KEY` del backend.  

**RLS requerida en Supabase:**
```sql
CREATE POLICY "admins eliminan perfiles_usuario" ON perfiles_usuario
FOR DELETE USING (public.es_admin());
```

---

## Flujo de un modal

```
Botón acción → abre modal con estado (modalEditar, modalEliminar, etc.)
     ↓
Usuario interactúa con el formulario → actualiza estado form
     ↓
Confirma → función async llama a Supabase → espera resultado
     ↓
Si error → muestra mensaje en formError
Si ok    → cierra modal + llama fetchUsuarios() para recargar tabla
```

---

## Políticas RLS que deben existir en Supabase

Ejecutar en el SQL Editor si aún no están:

```sql
-- Admins pueden actualizar y eliminar perfiles_usuario
CREATE POLICY "admins gestionan perfiles_usuario" ON perfiles_usuario
FOR ALL USING (public.es_admin());

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "usuarios actualizan propio" ON perfiles_usuario
FOR UPDATE USING (auth.uid() = user_id);
```

> La función `public.es_admin()` ya debe existir (creada en la corrección de RLS de la tabla perfiles).
