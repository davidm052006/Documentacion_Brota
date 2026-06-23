# CLAUDE.md — Contexto del proyecto Brota

## Stack
- **Frontend**: React 19 + Vite 7 + TailwindCSS 4 (en `frontend/`)
- **Backend**: Node.js + Express 5 CommonJS (en `backend/`, puerto **3001**)
- **DB/Auth**: Supabase (PostgreSQL + Supabase Auth)
- **Dev server frontend**: `npm run dev` desde `frontend/` — corre en puerto 5173 o 5174

## TailwindCSS v4 — IMPORTANTE
El oxide scanner NO recursiona subdirectorios profundos sin `@source` explícito.
Ver `frontend/src/index.css` — tiene `@source` explícitos por cada subdirectorio (`pages/**`, `components/**`, etc.).
**No quitar los @source**, si no el CSS cae de 88 kB a ~9 kB y todo se ve sin estilos.

## Arquitectura de páginas

### Rutas públicas (landing)
- `/` → `LandingPage.jsx` — landing completa con Navbar, Hero, "Tu camino en 3 pasos", Features, CTA
- `/login` → `Login.jsx` — maneja modos: `login`, `signup`, `forgotPassword` con `useAuth` hook
- `/privacidad`, `/terminos`, `/contacto`, `/servicios`, `/saber-mas` — páginas informativas

### Dashboard (protegidas)
- `/dashboard` → `Dashboard.jsx` — layout de 2 columnas: contenido + sidebar perfil
- `/dashboard/profesiones` → `Profesiones.jsx`
- `/dashboard/test` → `TestVocacional.jsx`
- `/dashboard/recursos` → `Recursos.jsx`
- `/dashboard/admin` → `AdminPanel.jsx`

### Layout del dashboard
- **TopNavbar** (`components/Layout/TopNavbar.jsx`) — navbar horizontal sticky con tabs
- **DashboardLayout** (`components/Layout/DashboardLayout.jsx`) — wrapper simple con TopNavbar
- **ELIMINADO**: sidebar vertical (Sidebar.jsx ya no se usa en DashboardLayout)

## Rediseño visual implementado (junio 2026)

### Basado en diseños en `frontend/public/diseños/`
Se implementaron todos los cambios visuales basados en los 8 archivos PNG de diseño.

#### ✅ Completado

**01-Landing**
- Nav links actualizados: Conoce Brota, Beneficios, Testimonios, FAQ
- Botón CTA → "Empezar gratis"
- Stats row: 4 bloques verdes (Orientación gratuita, Explorar áreas, Resultados personalizados, Toma decisiones)
- Sección Features con `id="por-que-brota"` para anchor

**02-Registro / 03-Login** (`Login.jsx` + `AuthCardShell.jsx` + `LoginCard.jsx`)
- Fondo: crema/off-white `bg-[#f2efea]` (claro) / `bg-[#0d110e]` (oscuro)
- Layout dos columnas: izquierda = branding (cambia por modo), derecha = card blanca limpia
- Modo login: "Tu camino sigue justo donde lo dejaste."
- Modo signup: "Crea tu cuenta y empieza a crecer." + lista de features
- Footer bar mínimo con links y dark mode toggle
- `AuthCardShell.jsx` rediseñado: fondo blanco, borde sutil, sin fondo ámbar

**04-Dashboard** (`Dashboard.jsx`)
- Top navbar horizontal en lugar de sidebar vertical
- HeroBanner verde con saludo "¡Hola, {nombre}! 🌱"
- 4 quick action cards en grid 2×2
- ProfileSidebar derecho: avatar con inicial, nombre, badge admin, "Completar perfil", racha 7 días

**05-TopNavbar** (`components/Layout/TopNavbar.jsx`) — NUEVO ARCHIVO
- Logo + "BROTA" a la izquierda
- Tabs: Inicio, Explorar, Test vocacional, Rutas, Recursos, Comunidad
- Derecha: Panel Admin (condicional para admins), ⭐ favoritos, 🌙/☀️ dark mode, avatar

**06-Profesiones** 
- Header actualizado: "Explora tu futuro profesional" + contador de programas grande

**08-Recursos**
- Tabs actualizados: Todos, Guías, YouTube (era Videos), Becas, Podcasts (era Herramientas)
- Layout más limpio: header con búsqueda inline + tabs debajo

#### 🔲 Pendiente (para próxima sesión)
- **Admin panel (05)**: revisar vs diseño — puede necesitar ajustes de layout
- **Test vocacional (07)**: progress bar superior con dots (actualmente usa sidebar de progreso)
- **Landing**: agregar secciones Testimonios y FAQ reales con IDs para los anchors
- **Registro (02)**: verificar que el card de signup tenga el `description` correcto
## ✅ Integración MEN API (completado junio 2026)

### Archivos creados/modificados
- `backend/src/controllers/sincronizacionController.js` — lógica completa de sync
- `backend/src/routes/admin.js` — rutas `GET /api/admin/sincronizacion/estado` y `POST /api/admin/sincronizacion/ejecutar`
- `frontend/src/services/adminService.js` — `getSincronizacionEstado()` y `ejecutarSincronizacion()`
- `frontend/src/pages/dashboard/admin/sections/ConfiguracionSection.jsx` — panel de sync con estado, botones verificar/sincronizar
- `backend/scripts/migration_men_sincronizacion.sql` — **EJECUTAR EN SUPABASE antes de usar**

### Tabla requerida en Supabase
Ejecutar `backend/scripts/migration_men_sincronizacion.sql` en el SQL Editor de Supabase:
```sql
CREATE TABLE men_sincronizacion (
  id SERIAL PRIMARY KEY, ejecutada_en TIMESTAMPTZ DEFAULT NOW(),
  remote_timestamp BIGINT, programas_importados INT, instituciones_importadas INT,
  estado TEXT DEFAULT 'exitosa', error TEXT
);
```

### Cómo funciona
1. **Verificar**: llama a metadata de datos.gov.co, compara `rowsUpdatedAt` con el timestamp guardado en `men_sincronizacion`
2. **Sincronizar**: descarga todos los programas activos (paginado 5000/lote), borra las tablas `programas` e `instituciones`, inserta los nuevos datos aplicando el `NBC_MAP` para asignar `area_academica`
3. Admin Panel → Configuración → panel "Datos educativos"

### Dataset MEN
- Endpoint: `https://datos.gov.co/resource/upr9-nkiz.json`
- Metadata: `https://datos.gov.co/api/views/upr9-nkiz.json` (campo `rowsUpdatedAt`)
- ~14.644 programas activos de todo el país
- Licencia CC-BY-SA 4.0 — oficial del Ministerio de Educación Nacional

### Pendiente
- Eliminar `backend/scripts/seed_instituciones.js` (datos hardcoded ya obsoletos)
- Borrar datos viejos de Bogotá de las tablas antes de primera sync nacional

## Modo Demo
Si no hay `VITE_SUPABASE_URL` en `.env`, la app entra en modo demo.
- Login demo: cualquier email/password
- Admin demo: email `davidm20.05.2006@gmail.com`
- La racha de días (streak) está hardcodeada en 3 días (por implementar)
