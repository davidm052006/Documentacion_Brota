# 🗺️ MAPAS Y FLUJOS DEL PROYECTO

## 📊 Estructura Final del Proyecto

```
BROTA/
│
├── frontend/                    ← 🟦 JULIÁN
│   ├── src/
│   │   ├── pages/
│   │   │   ├── landing/
│   │   │   │   ├── PreLoguin.jsx                  (MODIFICAR)
│   │   │   │   └── components/
│   │   │   │       ├── ForgotPassword.jsx         (CREAR)
│   │   │   │       └── ResetPassword.jsx          (CREAR)
│   │   │   └── dashboard/
│   │   │       └── Dashboard.jsx                  (MODIFICAR - REDISEÑAR)
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Sidebar.jsx                    (CREAR)
│   │   │   │   ├── Navbar.jsx                     (CREAR)
│   │   │   │   └── ProfileSidebar.jsx             (CREAR)
│   │   │   ├── Dashboard/
│   │   │   │   ├── WelcomeCard.jsx                (CREAR)
│   │   │   │   ├── QuickActions.jsx               (CREAR)
│   │   │   │   └── ContinueSection.jsx            (CREAR)
│   │   │   └── Shared/
│   │   │       ├── Button.jsx                     (Ya existe)
│   │   │       ├── Input.jsx                      (Ya existe)
│   │   │       └── Card.jsx                       (Ya existe)
│   │   └── App.jsx                                (MODIFICAR)
│   └── package.json
│
├── backend/                     ← 🟩 BRAYAN
│   ├── src/
│   │   ├── config/
│   │   │   ├── supabase.js                        (CREAR)
│   │   │   └── email.js                           (CREAR)
│   │   ├── routes/
│   │   │   └── auth.js                            (CREAR)
│   │   └── server.js                              (MODIFICAR)
│   ├── .env                                       (CREAR)
│   ├── setup_database.sql                         (MODIFICAR)
│   └── package.json
│
└── docs/                        ← 📚 DOCUMENTACIÓN (Ya creada)
    ├── RESUMEN_EJECUTIVO.md                       (Este)
    ├── DISTRIBUCION_TRABAJO.md                    (Este)
    ├── GUIA_IMPLEMENTACION_CODIGO.md              (Este)
    ├── RECOMENDACIONES_COORDINACION.md            (Este)
    └── CHECKLIST_DIARIA.md                        (Este)
```

---

## 🔄 FLUJO: Recuperación de Contraseña (Usuarios finales)

```
┌─────────────────────────────────────────────────────────────┐
│ PASO 1: Usuario entra a localhost                           │
├─────────────────────────────────────────────────────────────┤
│ Vista: Página de LOGIN                                      │
│ - Email input                                               │
│ - Contraseña input                                          │
│ - Botón "Inicia sesión"                                     │
│ - Link "¿Olvidaste tu contraseña?"  ← CLAVE                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 2: Usuario hace clic en "¿Olvidaste?"                  │
├─────────────────────────────────────────────────────────────┤
│ Vista: Página RECUPERAR CONTRASEÑA                          │
│ - Email input                                               │
│ - Botón "Enviar enlace de recuperación"                     │
│ - Link "Volver al inicio de sesión"                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 3: Usuario ingresa email y envía                       │
├─────────────────────────────────────────────────────────────┤
│ Frontend:                                                    │
│ 1. Valida que email tenga formato correcto                  │
│ 2. Envía POST a /api/auth/forgot-password                   │
│                                                              │
│ Backend:                                                     │
│ 1. Valida email (formato y existe en BD)                    │
│ 2. Genera token aleatorio (32 caracteres)                   │
│ 3. Guarda token en tabla password_reset_tokens              │
│ 4. Token es válido por 30 minutos                           │
│ 5. Envía email con link:                                    │
│    http://localhost:5173/reset-password?token=ABC123...     │
│                                                              │
│ Frontend muestra:                                            │
│ ✅ "Revisa tu correo. Enlace válido por 30 minutos"        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 4: Usuario abre email y hace clic en link              │
├─────────────────────────────────────────────────────────────┤
│ Email HTML contiene:                                        │
│ - "BROTA - Recupera tu contraseña"                          │
│ - Botón con link: reset-password?token=ABC123...            │
│ - Mensaje de seguridad                                      │
│                                                              │
│ Usuario → Hace clic en botón → Se abre navegador            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 5: Usuario ve página NUEVA CONTRASEÑA                  │
├─────────────────────────────────────────────────────────────┤
│ Vista: Página RESET PASSWORD                                │
│ - Nueva contraseña input                                    │
│ - Confirmar contraseña input                                │
│ - Botón "Actualizar contraseña"                             │
│                                                              │
│ Backend valida token:                                       │
│ - Token es válido (no expirado)                             │
│ - Token no ha sido usado antes                              │
│                                                              │
│ Si token válido:                                            │
│   → Muestra formulario                                      │
│ Si token inválido:                                          │
│   → Muestra error "Token expirado. Solicita uno nuevo"      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 6: Usuario ingresa nueva contraseña                    │
├─────────────────────────────────────────────────────────────┤
│ Frontend:                                                    │
│ 1. Valida que ambas contraseñas coincidan                   │
│ 2. Valida que sea mínimo 6 caracteres                       │
│ 3. Envía POST a /api/auth/reset-password                    │
│    { token, newPassword }                                   │
│                                                              │
│ Backend:                                                     │
│ 1. Valida token nuevamente (seguridad extra)                │
│ 2. Actualiza contraseña en Supabase Auth                    │
│ 3. Marca token como "usado" en BD                           │
│ 4. Responde { success: true }                               │
│                                                              │
│ Frontend muestra:                                            │
│ ✅ "Contraseña actualizada correctamente"                  │
│ - Link "Ir a iniciar sesión"                                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 7: Usuario inicia sesión con nueva contraseña          │
├─────────────────────────────────────────────────────────────┤
│ Vista: Página LOGIN (de nuevo)                              │
│ - Email input                                               │
│ - Contraseña input (NUEVA)                                  │
│ - Botón "Inicia sesión"                                     │
│                                                              │
│ Backend autentica correctamente                             │
│                                                              │
│ ✅ Usuario logueado                                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PASO 8: Dashboard                                           │
├─────────────────────────────────────────────────────────────┤
│ Vista: DASHBOARD NUEVO                                      │
│ - Bienvenida personalizada                                  │
│ - Menú lateral                                              │
│ - Perfil del usuario                                        │
│ - Acciones rápidas                                          │
│                                                              │
│ ✅ ÉXITO COMPLETO                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 FLUJO: Comunicación Frontend ↔ Backend

```
┌──────────────────────┐
│   FRONTEND (Julián)  │
│  localhost:5173      │
└──────────────────────┘
         │
         │ HTTP POST
         │ /api/auth/forgot-password
         ├─ Headers: Content-Type: application/json
         ├─ Body: { email: "user@gmail.com" }
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│          BACKEND (Brayan) - localhost:3000               │
│                                                          │
│  POST /api/auth/forgot-password                         │
│                                                          │
│  1. Recibe: { email }                                    │
│  2. Valida email (formato + existe)                      │
│  3. Genera token                                         │
│  4. Guarda token en BD                                   │
│  5. Envía email con link                                 │
│  6. Responde al frontend                                │
└──────────────────────────────────────────────────────────┘
         │
         │ HTTP Response 200
         ├─ Headers: Content-Type: application/json
         ├─ Body: { 
         │    success: true,
         │    message: "Si el email existe..."
         │  }
         │
         ▼
┌──────────────────────────────────────────────┐
│   FRONTEND (Julián) - Recibe respuesta       │
│                                              │
│  1. Verifica status 200                      │
│  2. Muestra mensaje "Revisa tu correo"       │
│  3. Limpia inputs                            │
│  4. Usuario satisfecho ✅                    │
└──────────────────────────────────────────────┘
```

---

## 📦 FLUJO: Base de Datos

```
┌─────────────────────────────────────────────────────────┐
│                    SUPABASE                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  auth.users (tabla built-in)                            │
│  ├─ id (UUID)                                           │
│  ├─ email                                               │
│  ├─ encrypted_password                                  │
│  └─ created_at                                          │
│                                                         │
│  password_reset_tokens (TABLA NUEVA)                    │
│  ├─ id (UUID) - PK                                      │
│  ├─ email                                               │
│  ├─ token (único)                                       │
│  ├─ expires_at                                          │
│  ├─ created_at                                          │
│  └─ used (boolean)                                      │
│                                                         │
│  PERFILES_USUARIO (existe)                              │
│  ├─ id                                                  │
│  ├─ user_id (FK a auth.users)                           │
│  ├─ nombre                                              │
│  ├─ apellido                                            │
│  ├─ edad                                                │
│  ├─ ciudad                                              │
│  └─ nivel_educativo                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 FLUJO: Variables de Entorno

```
VARIABLES NECESARIAS EN .env (Backend)
═════════════════════════════════════════

SUPABASE_URL=https://abc123.supabase.co
├─ ¿De dónde? Supabase Dashboard → Project Settings
└─ Formato: https://[PROJECT-ID].supabase.co

SUPABASE_ANON_KEY=eyJhbGc...
├─ ¿De dónde? Supabase Dashboard → API Keys
└─ Usar la "anon" key, NO la "service_role"

SMTP_USER=mi_correo@gmail.com
├─ ¿De dónde? Tu correo personal de Gmail
└─ Debe tener 2FA habilitado

SMTP_PASS=abcd efgh ijkl mnop
├─ ¿De dónde? https://myaccount.google.com/apppasswords
├─ NO es la contraseña normal de Gmail
├─ Es la "Contraseña de APP"
└─ Generar: Mail + Windows Computer

SMTP_FROM=noreply@brota.com
├─ ¿De dónde? El que quieras como remitente
└─ Puede ser cualquier email válido

JWT_SECRET=tu_secret_super_secreto_aqui
├─ ¿De dónde? Puedes generar uno con: crypto.randomBytes(32).toString('hex')
└─ Guárdalo seguro

PORT=3000
├─ ¿De dónde? Configurable
└─ Debe estar disponible (no usado por otro proceso)

NODE_ENV=development
├─ ¿De dónde? development | production
└─ En dev, muestra errores detallados
```

---

## 📝 FLUJO: Tareas en Paralelo

```
SEMANA 1
════════════════════════════════════════════════════════════

Lunes    Martes    Miércoles    Jueves      Viernes
├────────┼─────────┼──────────┼──────────┼──────────┤
│        │         │          │          │          │
│ BRAYAN │ BRAYAN  │  BRAYAN  │ BRAYAN   │ BRAYAN   │
│ Setup  │ Config  │ Database │ Routes   │ Testing  │
│        │ Email   │ SQL      │ Auth     │ Postman  │
│        │         │          │          │          │
├────────┼─────────┼──────────┼──────────┼──────────┤
│        │         │          │          │          │
│ JULIÁN │ JULIÁN  │ JULIÁN   │ JULIÁN   │ JULIÁN   │
│ Setup  │ Prep    │ Code     │ Code     │ Testing  │
│        │ Comps   │ ForgotPw │ ForgotPw │ Demo     │
│        │         │          │          │          │
├────────┼─────────┼──────────┼──────────┼──────────┤
│        │         │          │          │          │
│ DAVID  │ DAVID   │ DAVID    │ DAVID    │ DAVID    │
│ Review │ Review  │ Review   │ Testing  │ Planning │
│        │         │          │ & Debug  │ Sem 2    │
│        │         │          │          │          │
└────────┴─────────┴──────────┴──────────┴──────────┘

RESULTADO SEMANA 1:
✅ Backend completamente funcional (rutas lista para integración)
✅ Frontend con componentes preparados (listos para conectar)
✅ Base de datos lista con tabla password_reset_tokens


SEMANA 2
════════════════════════════════════════════════════════════

Lunes            Martes-Miércoles    Jueves       Viernes
├─────────────────┼────────────────────┼──────────┼──────────┤
│                 │                    │          │          │
│ BRAYAN          │ BRAYAN             │ BRAYAN   │ BRAYAN   │
│ Server.js       │ Soporte            │ Soporte  │ Testing  │
│ Update routes   │ Si hay bugs        │ Si hay   │ Integral │
│                 │ en integración     │ bugs     │          │
│                 │                    │          │          │
├─────────────────┼────────────────────┼──────────┼──────────┤
│                 │                    │          │          │
│ JULIÁN          │ JULIÁN - PRINCIPAL │ JULIÁN   │ JULIÁN   │
│ Integración     │ Rediseñar Dashboard│ Finalizar│ Testing  │
│ ForgotPw        │ - Sidebar          │ Dashboard│ Responsive│
│ Agrega link     │ - Navbar           │ - Estilos│          │
│                 │ - ProfileSidebar   │ - Ajustes│          │
│                 │                    │          │          │
├─────────────────┼────────────────────┼──────────┼──────────┤
│                 │                    │          │          │
│ DAVID           │ DAVID              │ DAVID    │ DAVID    │
│ Testing         │ Review código      │ Testing  │ DEPLOY   │
│ integración     │ Julián             │ completo │ Ready    │
│                 │ Review código      │          │          │
│                 │ Brayan             │          │          │
│                 │                    │          │          │
└─────────────────┴────────────────────┴──────────┴──────────┘

RESULTADO SEMANA 2:
✅ Recuperación de contraseña completamente funcional
✅ Dashboard rediseñado y en funcionamiento
✅ Todo integrado sin errores
✅ LISTO PARA DEPLOY
```

---

## 🔀 FLUJO: Estados del Componente ForgotPassword

```
INICIO
  │
  ├─ email: ''
  ├─ loading: false
  ├─ error: null
  ├─ success: false
  │
  ▼
┌──────────────────────────────────────────┐
│ Usuario escribe email                    │
│ - email = "user@gmail.com"               │
│ - Estado: INPUT_FILLED                   │
└──────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────┐
│ Usuario hace clic en "Enviar"            │
│ - Validar email en frontend              │
│ - Si error: mostrar mensaje              │
│ - Si OK: enviar a backend                │
└──────────────────────────────────────────┘
  │
  ├─ ERROR VALIDACIÓN
  │  │
  │  ▼
  │ error = "Email inválido"
  │ loading = false
  │ (mostramos error, usuario puede reintentar)
  │
  └─ OK
     │
     ├─ loading = true
     │ (mostrar spinner)
     │
     ▼
   Backend: /api/auth/forgot-password
     │
     ├─ ERROR BACKEND
     │  │
     │  ▼
     │ error = respuesta del backend
     │ loading = false
     │ (mostrar error, usuario puede reintentar)
     │
     └─ SUCCESS
        │
        ▼
       success = true
       loading = false
       
       Mostrar:
       ✅ "Revisa tu correo"
       - Botón "Volver al inicio"
       - Mensaje sobre validez del link (30 min)
```

---

## 🔐 FLUJO: Seguridad y Tokens

```
GENERACIÓN DE TOKEN
═══════════════════════════════════════

crypto.randomBytes(32).toString('hex')
│
├─ randomBytes(32): genera 32 bytes aleatorios
│
└─ toString('hex'): convierte a formato hex (64 caracteres)

Resultado: "abc123def456..." (64 caracteres únicos)


VALIDACIÓN DE TOKEN
═══════════════════════════════════════

Token enviado por usuario
         │
         ▼
¿Token existe en BD?
         │
    ├─ NO  → Error "Token inválido"
    │
    └─ SÍ
         │
         ▼
¿Token ya fue usado?
         │
    ├─ SÍ  → Error "Token ya usado"
    │
    └─ NO
         │
         ▼
¿Token expiró? (comparar expires_at con NOW())
         │
    ├─ SÍ  → Error "Token expirado"
    │
    └─ NO
         │
         ▼
    ✅ Token válido
    
    Permitir resetear contraseña
    Marcar token como "usado"


TIEMPO DE EXPIRACIÓN
═══════════════════════════════════════

Generación: NOW() = 2026-06-07 14:30:00
Expiration: 30 minutos después = 2026-06-07 15:00:00

Usuario abre email en: 2026-06-07 14:45:00
- Token aún válido (quedan 15 min) ✅

Usuario abre email en: 2026-06-07 15:05:00
- Token ya expiró (pasaron 35 min) ❌
- Mensaje: "Solicita uno nuevo"
```

---

## 📧 FLUJO: Envío de Email

```
Backend genera token
     │
     ▼
Crear contenido HTML del email
     │
     ├─ Logo BROTA
     ├─ Título: "Recupera tu contraseña"
     ├─ Mensaje personalizado
     ├─ Botón con link: http://localhost:5173/reset-password?token=ABC123
     └─ Footer: "© 2026 BROTA"
     │
     ▼
Nodemailer.transporter.sendMail({
  from: 'noreply@brota.com',
  to: 'user@gmail.com',
  subject: '🌱 BROTA - Recupera tu contraseña',
  html: '<HTML CONTENT>'
})
     │
     ├─ ERROR
     │  │
     │  ▼
     │ Gmail rechaza por credenciales
     │ Responder al frontend: 500 error
     │ Loguear en consola del servidor
     │
     └─ SUCCESS
        │
        ▼
       Email enviado a bandeja de usuario
       Responder al frontend: 200 success
```

---

Este es el "corazón" del proyecto visualmente. Úsalo como referencia cuando haya confusión.
