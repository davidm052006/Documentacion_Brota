const jwt = require('jsonwebtoken');

const supabase = require('../config/supabase');
const { sendEmail } = require('../config/email');

const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });
    }

    const { data } =
      await supabase.auth.admin.listUsers();

    const user =
      data.users.find(
        u => u.email === email
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendEmail(
      email,
      'Recuperar contraseña',
      `
      <h2>Recuperación de contraseña</h2>

      <p>Haz clic en el enlace:</p>

      <a href="${resetLink}">
        Restablecer contraseña
      </a>

      <p>Este enlace vence en 30 minutos.</p>
      `
    );

    return res.json({
      success: true,
      message: 'Correo enviado'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const resetPassword = async (req, res) => {

  try {

    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Datos incompletos'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mínimo 6 caracteres'
      });
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const { error } =
      await supabase.auth.admin.updateUserById(
        decoded.userId,
        {
          password: newPassword
        }
      );

    if (error) {
      throw error;
    }

    return res.json({
      success: true,
      message: 'Contraseña actualizada'
    });

  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  forgotPassword,
  resetPassword
};