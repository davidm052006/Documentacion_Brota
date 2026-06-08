const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const supabase = require('../config/supabase');

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'please-set-a-secure-secret';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

function createMailer() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error('Faltan variables de entorno para enviar correo: EMAIL_HOST, EMAIL_USER, EMAIL_PASS');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildResetUrl(token) {
  return `${frontendUrl.replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`;
}

async function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await supabase.auth.admin.listUsers({ limit: 100 });

  if (error) {
    throw error;
  }

  const users = data?.users || data;
  if (!Array.isArray(users)) {
    return null;
  }

  return users.find((user) => user.email?.toLowerCase() === normalizedEmail) || null;
}

router.post('/auth/forgot-password', async (req, res, next) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'El correo es obligatorio.' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.json({
        status: 'ok',
        message: 'Si existe una cuenta con ese correo, recibirás instrucciones en breve.',
      });
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: jwtExpiresIn });
    const resetUrl = buildResetUrl(token);
    const transporter = createMailer();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña - Brota',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <p><a href="${resetUrl}" style="color: #2f855a;">Restablecer contraseña</a></p>
          <p>Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
          <p><code>${resetUrl}</code></p>
          <p>Este enlace expira en ${jwtExpiresIn}.</p>
          <p>Si no solicitaste este cambio, ignora este mensaje.</p>
          <p>Saludos,<br>Equipo Brota</p>
        </div>
      `,
    });

    res.json({
      status: 'ok',
      message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/reset-password', async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ status: 'error', message: 'Token y nueva contraseña son obligatorios.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ status: 'error', message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    let payload;
    try {
      payload = jwt.verify(token, jwtSecret);
    } catch (err) {
      return res.status(400).json({ status: 'error', message: 'Token inválido o expirado.' });
    }

    const email = payload.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'No se encontró el usuario.' });
    }

    const { data, error } = await supabase.auth.admin.updateUserById(user.id, { password });
    if (error) {
      throw error;
    }

    res.json({ status: 'ok', message: 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.' });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/verify-reset-token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ status: 'error', message: 'Token requerido.' });
  }

  try {
    jwt.verify(token, jwtSecret);
    res.json({ status: 'ok', valid: true });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Token inválido o expirado.' });
  }
});

module.exports = router;
