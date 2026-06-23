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
- **Integración dataset MEN** (`datos.gov.co/api/v3/views/upr9-nkiz`): 27.005 programas activos de educación superior, API Socrata, última actualización enero 2025

## Dataset MEN (para recomendador vocacional)
- URL: `https://www.datos.gov.co/api/v3/views/upr9-nkiz/query.json`
- 27.005 registros totales, 14.644 activos
- Campos clave: `nombreinstitucion`, `nombreprograma`, `nombreareaconocimiento`, `nombrenbc`, `nombrenivelacademico`, `nombremetodologia`, `nombremunicipioinstitucion`, `nombreestadoprograma`
- Licencia CC-BY-SA 4.0 — oficial del Ministerio de Educación Nacional
- Formato API: Socrata — soporta `$where`, `$select`, `$limit`, `$order`

## Modo Demo
Si no hay `VITE_SUPABASE_URL` en `.env`, la app entra en modo demo.
- Login demo: cualquier email/password
- Admin demo: email `davidm20.05.2006@gmail.com`
- La racha de días (streak) está hardcodeada en 3 días (por implementar)
