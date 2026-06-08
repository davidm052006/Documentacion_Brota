# 📋 DISTRIBUCIÓN DE TRABAJO - BROTA

## 📊 Resumen General
- **JULIÁN**: Frontend (Dashboard + Recuperación de Contraseña)
- **BRAYAN**: Backend (Servidor, BD, Envío de correo, Validaciones)
- **DAVID**: Coordinación y validación

---

## 👨‍💻 PART 1: JULIÁN - FRONTEND (Dashboard + Recuperación de Contraseña)

### 🎯 Objetivo
Implementar la nueva UI del dashboard y agregar la funcionalidad de recuperación de contraseña con la pantalla de recuperación diseñada.

### 📁 Archivos a modificar/crear

#### 1. **RECUPERACIÓN DE CONTRASEÑA** (Nuevo componente)
**Ubicación**: `frontend/src/pages/landing/components/ForgotPassword.jsx`

**Qué hacer**:
- Crear un nuevo componente basado en el diseño proporcionado
- Estados necesarios:
  - `email` (input del usuario)
  - `loading` (mientras se envía)
  - `error` (mensaje de error)
  - `success` (si se envió el correo exitosamente)
  
- Lógica:
  1. Usuario ingresa email en el formulario
  2. Validar que sea email válido (regex)
  3. Enviar petición POST a `http://localhost:3000/api/auth/forgot-password`
  4. Si es exitoso → mostrar mensaje "Revisa tu correo"
  5. Si falla → mostrar error

**Estructura aproximada**:
```jsx
function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSendReset = async (e) => {
    e.preventDefault();
    // Validar email
    // Hacer fetch a /api/auth/forgot-password
    // Manejar respuesta
  };

  return (
    // Formulario con email input
    // Botón "Enviar enlace de recuperación"
    // Botón atrás
  );
}
```

#### 2. **ACTUALIZAR PreLoguin.jsx**
**Ubicación**: `frontend/src/pages/landing/PreLoguin.jsx`

**Cambios**:
- Agregar estado `showForgotPassword` (para mostrar/ocultar el componente ForgotPassword)
- Agregar link "¿Olvidaste tu contraseña?" debajo del formulario de login
- Cambiar entre modo login/signup/forgot-password

```jsx
// Agregar este estado
const [showForgotPassword, setShowForgotPassword] = useState(false);

// En el JSX, mostrar ForgotPassword cuando showForgotPassword === true
// Mostrar login cuando showForgotPassword === false
```

#### 3. **ACTUALIZAR Dashboard.jsx** ⭐ PRINCIPAL
**Ubicación**: `frontend/src/pages/dashboard/Dashboard.jsx`

**Cambios necesarios**:
- Reemplazar la UI actual con el nuevo diseño del dashboard
- Mantener la lógica actual de:
  - Cargar perfil del usuario
  - Cerrar sesión
  - Modo demo

**Elementos del nuevo dashboard a implementar**:
```
- Navbar superior: Logo BROTA + notificación + perfil usuario + dropdown
- Sidebar izquierdo: 
  - Inicio
  - Explorar profesiones
  - Test vocacional
  - Rutas formativas
  - Recursos
  - Favoritos
  - Comunidad
  - Mensajes
  - Ajustes
  - Cerrar sesión

- Contenido principal:
  - Card de bienvenida (¡Bienvenido a BROTA!)
  - Sección "¿Qué te gustaría hacer hoy?" (4 opciones)
  - Sección "Continúa donde lo dejaste"
  
- Panel lateral derecho: Tu perfil
  - Mostrar datos del usuario (nombre, email, edad, ciudad, etc.)
```

**Estructura de componentes sugerida**:
```
frontend/src/components/
├── Layout/
│   ├── Sidebar.jsx (menú izquierdo)
│   ├── Navbar.jsx (barra superior)
│   └── ProfileSidebar.jsx (panel derecho de perfil)
├── Dashboard/
│   ├── WelcomeCard.jsx
│   ├── QuickActions.jsx
│   └── ContinueSection.jsx
└── Shared/
    ├── Button.jsx
    ├── Input.jsx
    └── Card.jsx
```

**Props que el Dashboard recibe**:
```javascript
Dashboard({ 
  user,          // Objeto del usuario autenticado
  isDemoMode,    // Boolean
  profile        // Datos del perfil desde BD
})
```

### ✅ Checklist para Julián

- [ ] Crear componente ForgotPassword.jsx
- [ ] Actualizar PreLoguin.jsx para integrar ForgotPassword
- [ ] Crear componentes Layout (Sidebar, Navbar, ProfileSidebar)
- [ ] Reescribir Dashboard.jsx con el nuevo diseño
- [ ] Asegurar responsive design (funcione en mobile)
- [ ] Validar que todos los links del sidebar sean clicables (aunque aún no hagan nada)
- [ ] Probar con modo demo (sin backend)
- [ ] Agregar estilos Tailwind CSS

---

## 🖥️ PART 2: BRAYAN - BACKEND (Servidor, BD, Email, Validaciones)

### 🎯 Objetivo
Implementar el servidor backend con todas las rutas de autenticación, envío de correos, validaciones y conexión con la base de datos.

### 📁 Archivos a crear/modificar

#### **PASO 1: Configurar las dependencias** ⭐ PRIMERO
**Ubicación**: `backend/package.json`

**Qué instalar**:
```bash
npm install nodemailer
npm install bcryptjs  (para hashear contraseñas)
```

Actualizar `package.json` → agregar las siguientes dependencias:
```json
{
  "dependencies": {
    "nodemailer": "^6.9.7",
    "bcryptjs": "^2.4.3"
  }
}
```

**Crear archivo**: `backend/.env.example` (para documentar qué variables se necesitan):
```
SUPABASE_URL=tu_url_aqui
SUPABASE_ANON_KEY=tu_key_aqui
SMTP_USER=correo_para_enviar@gmail.com
SMTP_PASS=tu_contraseña_app_gmail
SMTP_FROM=noreply@brota.com
JWT_SECRET=tu_secret_super_secreto
PORT=3000
NODE_ENV=development
```

#### **PASO 2: Crear configuración de Supabase**
**Ubicación**: `backend/src/config/supabase.js` (CREAR)

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
```

#### **PASO 3: Crear configuración de Email (Nodemailer)**
**Ubicación**: `backend/src/config/email.js` (CREAR)

```javascript
const nodemailer = require('nodemailer');

// Configurar el transporter (el "cartero" que envía emails)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS  // NOTA: Usar contraseña de APP (no la normal)
  }
});

// Función para enviar email
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: to,
      subject: subject,
      html: htmlContent
    });
    
    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { transporter, sendEmail };
```

**NOTA IMPORTANTE**: Para usar Gmail:
1. Habilitar autenticación de 2 factores
2. Generar "Contraseña de App" en https://myaccount.google.com/apppasswords
3. Usar esa contraseña en `SMTP_PASS`

#### **PASO 4: Crear rutas de autenticación**
**Ubicación**: `backend/src/routes/auth.js` (CREAR)

Aquí van todas las rutas relacionadas con autenticación:

**Ruta 1: POST /api/auth/forgot-password**
```javascript
// Qué hace: Envía email con link para recuperar contraseña
// Body esperado: { email: "usuario@gmail.com" }

// Proceso:
// 1. Validar que el email existe en la BD
// 2. Generar un token temporal (válido 30 minutos)
// 3. Guardar el token en la tabla password_reset_tokens
// 4. Enviar email con link: 
//    http://localhost:5173/reset-password?token=xyz123
// 5. Responder { success: true }

// Errores posibles:
// - Email no existe → responder 404
// - Error enviando email → responder 500
```

**Ruta 2: POST /api/auth/reset-password**
```javascript
// Qué hace: Permite al usuario establecer nueva contraseña
// Body esperado: { 
//   token: "xyz123",
//   newPassword: "contraseña_nueva"
// }

// Proceso:
// 1. Validar que el token es válido y no expiró
// 2. Obtener el email del token
// 3. Actualizar la contraseña en Supabase Auth
// 4. Borrar el token (no volver a usarlo)
// 5. Responder { success: true }

// Errores:
// - Token inválido/expirado → responder 401
// - Error actualizando BD → responder 500
```

**Ruta 3: POST /api/auth/register** (OPCIONAL - para futuro)
```javascript
// Qué hace: Registrar nuevo usuario en BD
// Valida datos en backend antes de guardar
```

#### **PASO 5: Crear tabla en la BD (SQL)**
**Ubicación**: `backend/setup_database.sql`

Agregar esta tabla para guardar los tokens de recuperación:

```sql
-- Tabla para tokens de recuperación de contraseña
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  used BOOLEAN DEFAULT FALSE
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_email ON password_reset_tokens(email);
```

#### **PASO 6: Actualizar server.js principal**
**Ubicación**: `backend/src/server.js`

Agregar las rutas de autenticación:
```javascript
// Al inicio, agregar:
const authRoutes = require('./routes/auth');

// Después de los middlewares (después de app.use(express.json())):
app.use('/api/auth', authRoutes);
```

### 📊 Validaciones en Backend que Brayan debe implementar

**En PreLogin (Frontend → Backend)**:
1. ✅ Email válido (formato correcto)
2. ✅ Email existe en BD (antes de reset)
3. ✅ Contraseña mínimo 6 caracteres
4. ✅ Token válido y no expirado

**En Dashboard (Frontend → Backend)**:
1. ✅ Usuario autenticado (verificar JWT/sesión)
2. ✅ No acceder sin token válido

### ✅ Checklist para Brayan

**Backend Setup**:
- [ ] Instalar dependencias (nodemailer, bcryptjs)
- [ ] Crear archivo .env con variables de configuración
- [ ] Crear `backend/src/config/supabase.js`
- [ ] Crear `backend/src/config/email.js`

**Base de Datos**:
- [ ] Crear tabla `password_reset_tokens` en `setup_database.sql`
- [ ] Ejecutar script SQL en Supabase para crear la tabla
- [ ] Verificar que la tabla se creó correctamente

**Rutas de Autenticación**:
- [ ] Crear `backend/src/routes/auth.js`
- [ ] Implementar POST `/api/auth/forgot-password`
- [ ] Implementar POST `/api/auth/reset-password`
- [ ] Implementar validaciones en cada ruta

**Servidor Principal**:
- [ ] Actualizar `backend/src/server.js`
- [ ] Agregar rutas de autenticación

**Pruebas**:
- [ ] Testear `/api/health` (debe responder OK)
- [ ] Testear `/api/auth/forgot-password` con email válido
- [ ] Testear `/api/auth/forgot-password` con email inválido
- [ ] Testear `/api/auth/reset-password` con token válido
- [ ] Testear `/api/auth/reset-password` con token expirado

---

## 🔗 CONEXIÓN FRONTEND ↔ BACKEND

### Cómo Julián debe llamar a las rutas de Brayan

**En ForgotPassword.jsx**:
```javascript
const handleSendReset = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Error enviando correo');
      return;
    }

    setSuccess(true);
    // Mostrar mensaje de éxito
  } catch (error) {
    setError('Error de conexión');
  } finally {
    setLoading(false);
  }
};
```

### Respuestas esperadas del Backend

**Exitosa**:
```json
{
  "success": true,
  "message": "Correo enviado exitosamente"
}
```

**Error**:
```json
{
  "success": false,
  "message": "Email no encontrado"
}
```

---

## ⏱️ ORDEN DE TRABAJO RECOMENDADO

### **Semana 1: Preparación**
1. **Brayan** configura el backend (variables de entorno, Supabase, Email)
2. **Julián** crea estructura de componentes del Dashboard
3. Pruebas de conexión básica entre frontend/backend

### **Semana 2: Funcionalidades Principales**
1. **Brayan** implementa rutas de autenticación
2. **Julián** integra ForgotPassword en PreLoguin
3. Pruebas manuales de forgot-password

### **Semana 3: Dashboard Completo**
1. **Julián** rediseña Dashboard con nueva UI
2. **Brayan** optimiza backend y agrega más validaciones
3. Pruebas completas del flujo

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "Error: Cannot find module 'nodemailer'"
**Solución**: Brayan debe ejecutar `npm install` en la carpeta backend

### ❌ "Error: CORS policy"
**Solución**: Verificar que el backend tiene `cors()` habilitado en `server.js`

### ❌ "Email no se envía"
**Solución**: 
- Verificar variables de .env
- Verificar que usó contraseña de APP (no la normal de Gmail)
- Verificar autenticación 2FA está habilitada

### ❌ "Frontend no encuentra el backend"
**Solución**: Asegurar que ambos estén corriendo:
- Backend: `npm run dev` en carpeta `backend`
- Frontend: `npm run dev` en carpeta `frontend`
- URLs deben ser: `http://localhost:3000` (backend) y `http://localhost:5173` (frontend)

---

## 📞 COMUNICACIÓN ENTRE ELLOS

**Julián le dice a Brayan**:
- "Necesito una ruta en POST /api/auth/forgot-password que reciba `{ email }`"
- "¿Qué respuesta me devuelves si el email no existe?"
- "¿En cuánto tiempo se envía el correo?"

**Brayan le dice a Julián**:
- "La ruta está lista en http://localhost:3000/api/auth/forgot-password"
- "Te devuelvo `{ success: true }` si es exitoso"
- "El correo tiene un token válido por 30 minutos"

---

## ✨ RECOMENDACIONES ADICIONALES

### Para Julián:
1. Usa componentes reutilizables (Button, Input, Card)
2. Mantén Tailwind CSS para estilos consistentes
3. Prueba con modo demo mientras Brayan termina backend
4. Crea estados locales antes de conectar con backend

### Para Brayan:
1. Usa variables de entorno (nunca hardcodes credenciales)
2. Valida SIEMPRE en el backend (no confíes solo en frontend)
3. Usa try-catch en todo lo asíncrono
4. Registra (console.log) todo para debugging
5. Prueba cada ruta con Postman o curl antes de integrar con frontend

### Para David:
1. Hacer merge de cambios regularmente
2. Verificar que ambos cumplan con este plan
3. Hacer testing de integración al final

---

## 📌 RESUMEN RÁPIDO

| Tarea | Responsable | Archivos | Orden |
|-------|------------|----------|-------|
| ForgotPassword component | Julián | `frontend/src/pages/landing/components/ForgotPassword.jsx` | 2 |
| Actualizar PreLoguin | Julián | `frontend/src/pages/landing/PreLoguin.jsx` | 3 |
| Rediseñar Dashboard | Julián | `frontend/src/pages/dashboard/Dashboard.jsx` | 4 |
| Config Supabase | Brayan | `backend/src/config/supabase.js` | 1 |
| Config Email | Brayan | `backend/src/config/email.js` | 1 |
| Setup BD | Brayan | `backend/setup_database.sql` | 1 |
| Rutas Auth | Brayan | `backend/src/routes/auth.js` | 2 |
| Actualizar server.js | Brayan | `backend/src/server.js` | 3 |

---

**Estado**: 🟢 Proyecto listo para empezar
**Última actualización**: 07-06-2026
**Responsable**: 
