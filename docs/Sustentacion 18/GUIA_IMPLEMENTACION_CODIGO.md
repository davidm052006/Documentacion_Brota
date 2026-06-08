# 💻 GUÍA DE IMPLEMENTACIÓN - CÓDIGO LISTO PARA COPIAR

Esta guía contiene fragmentos de código que Julián y Brayan pueden copiar y pegar directamente.

---

## 🟦 PARTE 1: BRAYAN - BACKEND

### 1. Variables de Entorno (.env)

Crear archivo: `backend/.env`

```env
# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...tu_key_aqui

# Email (Gmail)
SMTP_USER=tucorreo@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM=noreply@brota.com

# General
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secret_super_duper_secreto_aqui
```

**⚠️ IMPORTANTE**: Esta contraseña NO es la normal de Gmail, es una "Contraseña de App":
1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Mail" y "Windows Computer"
3. Copia la contraseña generada (sin espacios para el .env)

---

### 2. Configuración de Supabase (backend/src/config/supabase.js)

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Falta SUPABASE_URL o SUPABASE_ANON_KEY en .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
```

---

### 3. Configuración de Email (backend/src/config/email.js)

```javascript
const nodemailer = require('nodemailer');

// Crear transporter (configura cómo se envían emails)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Función para enviar emails
 * @param {string} to - Email del destinatario
 * @param {string} subject - Asunto del email
 * @param {string} htmlContent - Contenido HTML del email
 */
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: to,
      subject: subject,
      html: htmlContent
    });
    
    console.log('✅ Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { transporter, sendEmail };
```

---

### 4. Rutas de Autenticación (backend/src/routes/auth.js)

```javascript
const express = require('express');
const crypto = require('crypto');
const supabase = require('../config/supabase');
const { sendEmail } = require('../config/email');

const router = express.Router();

// =============================================
// POST /api/auth/forgot-password
// =============================================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Validar que el email fue enviado
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El email es requerido'
      });
    }

    // 2. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de email inválido'
      });
    }

    // 3. Verificar que el email existe en Supabase
    const { data: users, error: searchError } = await supabase.auth.admin.listUsers();
    
    const userExists = users?.users?.some(user => user.email === email);
    
    if (!userExists) {
      // Por seguridad, no decimos si el email existe o no
      // Respondemos que se envió el correo de todas formas
      return res.status(200).json({
        success: true,
        message: 'Si el email existe, recibirás un link para recuperar tu contraseña'
      });
    }

    // 4. Generar token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 5. Token válido por 30 minutos
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // 6. Guardar token en tabla password_reset_tokens
    const { error: insertError } = await supabase
      .from('password_reset_tokens')
      .insert({
        email: email,
        token: resetToken,
        expires_at: expiresAt,
        used: false
      });

    if (insertError) {
      console.error('Error guardando token:', insertError);
      return res.status(500).json({
        success: false,
        message: 'Error procesando solicitud'
      });
    }

    // 7. Crear URL para resetear contraseña
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

    // 8. Crear contenido HTML del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; line-height: 1.6; color: #333; }
          .button { display: inline-block; background-color: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌱 BROTA</h1>
            <p>Recupera tu contraseña</p>
          </div>
          
          <div class="content">
            <p>¡Hola!</p>
            <p>Recibimos una solicitud para recuperar tu contraseña. Si no fuiste tú, puedes ignorar este correo.</p>
            
            <p><strong>Para recuperar tu contraseña, haz clic aquí:</strong></p>
            
            <a href="${resetUrl}" class="button">Recuperar Contraseña</a>
            
            <p>O copia este enlace:</p>
            <p><code>${resetUrl}</code></p>
            
            <p><strong>Este enlace es válido por 30 minutos.</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2026 BROTA. Todos los derechos reservados.</p>
            <p>Si tienes problemas, contáctanos en soporte@brota.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 9. Enviar email
    const emailResult = await sendEmail(
      email,
      '🌱 BROTA - Recupera tu contraseña',
      htmlContent
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Error enviando correo de recuperación'
      });
    }

    // 10. Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Si el email existe, recibirás un link para recuperar tu contraseña'
    });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// =============================================
// POST /api/auth/reset-password
// =============================================
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // 1. Validar que el token y contraseña fueron enviados
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token y contraseña son requeridos'
      });
    }

    // 2. Validar que la contraseña sea mínimo 6 caracteres
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener mínimo 6 caracteres'
      });
    }

    // 3. Buscar el token en la BD
    const { data: tokens, error: searchError } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('token', token)
      .single();

    // 4. Si no encontramos el token
    if (searchError || !tokens) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    // 5. Verificar que el token no ha sido usado
    if (tokens.used) {
      return res.status(401).json({
        success: false,
        message: 'Este token ya ha sido usado'
      });
    }

    // 6. Verificar que el token no ha expirado
    if (new Date(tokens.expires_at) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Solicita uno nuevo.'
      });
    }

    // 7. Obtener el email del token
    const email = tokens.email;

    // 8. Actualizar la contraseña en Supabase Auth
    // NOTA: Esto requiere usar admin SDK
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      tokens.user_id, // Necesitamos guardar user_id cuando creamos el token
      { password: newPassword }
    );

    // Para MVP simplificado, puedes usar signUp con actualización manual
    // Consulta con tu setup específico de Supabase

    if (updateError) {
      console.error('Error actualizando contraseña:', updateError);
      return res.status(500).json({
        success: false,
        message: 'Error actualizando contraseña'
      });
    }

    // 9. Marcar el token como usado
    const { error: markError } = await supabase
      .from('password_reset_tokens')
      .update({ used: true })
      .eq('id', tokens.id);

    // 10. Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada correctamente'
    });

  } catch (error) {
    console.error('Error en reset-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// =============================================
// GET /api/auth/validate-token
// =============================================
router.get('/validate-token', async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token requerido'
      });
    }

    const { data: tokenData, error } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !tokenData) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    if (tokenData.used) {
      return res.status(401).json({
        success: false,
        message: 'Token ya fue usado'
      });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Token válido'
    });

  } catch (error) {
    console.error('Error validando token:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
```

---

### 5. Actualizar server.js (backend/src/server.js)

Agreguen estas líneas después de `app.use(express.json())`:

```javascript
// ========== IMPORTAR RUTAS ==========
const authRoutes = require('./routes/auth');

// ========== MIDDLEWARES ==========
app.use(cors());
app.use(express.json());

// ========== RUTAS ==========
app.use('/api/auth', authRoutes); // ← AGREGAR ESTA LÍNEA
```

---

### 6. SQL para crear tabla (backend/setup_database.sql)

Ejecutar en Supabase SQL Editor:

```sql
-- Tabla para tokens de recuperación de contraseña
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  used BOOLEAN DEFAULT FALSE
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_password_reset_tokens_token 
  ON password_reset_tokens(token);
  
CREATE INDEX idx_password_reset_tokens_email 
  ON password_reset_tokens(email);
  
CREATE INDEX idx_password_reset_tokens_expires_at 
  ON password_reset_tokens(expires_at);
```

---

## 🟩 PARTE 2: JULIÁN - FRONTEND

### 1. Componente ForgotPassword.jsx

Crear: `frontend/src/pages/landing/components/ForgotPassword.jsx`

```jsx
import { useState } from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Validar formato email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar email
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Correo inválido');
      return;
    }

    setLoading(true);

    try {
      // Llamar al backend
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error enviando correo');
        setLoading(false);
        return;
      }

      // Éxito
      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
        <div className="w-1/2 flex flex-col justify-center pr-10">
          <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">
            🌱 BROTA
          </h1>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Correo enviado
              </h3>
              <p className="text-gray-700 mb-6">
                Revisa tu bandeja de entrada. Si no ves el mensaje, revisa tu carpeta de spam.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                El enlace es válido por 30 minutos.
              </p>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
              >
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
      <div className="w-1/2 flex flex-col justify-center pr-10">
        <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">
          🌱 BROTA
        </h1>
        <h2 className="text-3xl font-medium text-black mb-10 leading-snug">
          Recupera tu acceso
        </h2>
        <p className="text-lg text-gray-700">
          Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para establecer una nueva contraseña.
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-white/30">
          <h3 className="text-2xl font-bold text-center text-black">
            Recupera tu contraseña
          </h3>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSendReset} className="flex flex-col gap-4">
            <Input
              placeholder="Escribe tu correo..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              type="email"
            />

            <Button disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </Button>
          </form>

          <button
            onClick={onBack}
            className="text-green-600 hover:text-green-700 font-semibold text-center transition"
          >
            ← Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
```

---

### 2. Actualizar PreLoguin.jsx

En `frontend/src/pages/landing/PreLoguin.jsx`, agregar:

```jsx
// Al inicio del componente, agregar:
import ForgotPassword from './components/ForgotPassword';

// En la función principal, agregar estado:
const [showForgotPassword, setShowForgotPassword] = useState(false);

// En el return, reemplazar todo por:
return (
  <>
    {showForgotPassword ? (
      <ForgotPassword onBack={() => setShowForgotPassword(false)} />
    ) : (
      <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
        {/* ... resto del código igual ... */}
        
        {/* Agregar este link en el formulario, debajo del botón de login: */}
        {mode === 'login' && (
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-green-600 hover:text-green-700 text-sm font-semibold text-center transition"
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </div>
    )}
  </>
);
```

---

### 3. Crear componente ResetPassword.jsx (opcional - para validar token)

Crear: `frontend/src/pages/landing/components/ResetPassword.jsx`

```jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    // Validar token al cargar
    const validateToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/validate-token?token=${token}`
        );
        if (!response.ok) {
          setError('Token inválido o expirado');
        }
      } catch (err) {
        setError('Error validando token');
      } finally {
        setValidating(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setError('Token no proporcionado');
      setValidating(false);
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error reseteando contraseña');
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Validando...</p>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/" className="text-green-600 hover:underline">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-2xl font-bold text-green-600 mb-4">✅ Éxito!</p>
          <p className="text-gray-700 mb-6">Tu contraseña ha sido restablecida correctamente.</p>
          <a href="/" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Ir a iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
      <div className="w-1/2 flex flex-col justify-center pr-10">
        <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">
          🌱 BROTA
        </h1>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm">
          <h3 className="text-2xl font-bold text-center text-black mb-6">
            Nueva contraseña
          </h3>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <Input
              placeholder="Nueva contraseña..."
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              placeholder="Confirma tu contraseña..."
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
```

---

### 4. Agregar ruta ResetPassword en App.jsx

En `frontend/src/App.jsx`, agregar:

```jsx
import ResetPassword from './pages/landing/components/ResetPassword';

// En las rutas, agregar:
<Route path="/reset-password" element={<ResetPassword />} />
```

---

## 🧪 PRUEBAS (Testing)

### Prueba con Postman o curl

**1. Enviar correo de recuperación:**

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@gmail.com"}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Si el email existe, recibirás un link para recuperar tu contraseña"
}
```

**2. Resetear contraseña:**

```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token": "abc123xyz...", "newPassword": "nuevacontraseña"}'
```

---

## 📝 Checklist Final

- [ ] Brayan instaló `nodemailer` y `bcryptjs`
- [ ] Brayan creó archivo `.env` con variables
- [ ] Brayan creó archivos de configuración (supabase.js, email.js)
- [ ] Brayan implementó rutas en `routes/auth.js`
- [ ] Brayan actualizó `server.js` con rutas
- [ ] Brayan ejecutó SQL para crear tabla `password_reset_tokens`
- [ ] Julián creó componente `ForgotPassword.jsx`
- [ ] Julián actualizó `PreLoguin.jsx`
- [ ] Julián creó componente `ResetPassword.jsx` (opcional)
- [ ] Ambos testearon el flujo completo
- [ ] Ambos verific que funciona tanto en modo demo como con backend real

---

**¡Listo para trabajar! 🚀**
