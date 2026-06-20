const express        = require('express');
const router         = express.Router();
const verificarAuth  = require('../middlewares/verificarAuth');
const { registerPerfil } = require('../controllers/authController');

// POST /api/auth/register-perfil
// Crea el perfil de usuario tras el signUp de Supabase.
// Requiere token válido (el usuario ya existe en Supabase Auth).
router.post('/register-perfil', verificarAuth, registerPerfil);

module.exports = router;
