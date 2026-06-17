const express       = require('express');
const router        = express.Router();
const verificarAdmin = require('../middlewares/verificarAdmin');
const {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getStats,
} = require('../controllers/adminController');

// Todas las rutas de este router requieren rol admin
router.use(verificarAdmin);

// Estadísticas generales del sistema
router.get('/stats', getStats);

// CRUD de usuarios
router.get   ('/usuarios',     getUsuarios);
router.get   ('/usuarios/:id', getUsuario);
router.post  ('/usuarios',     createUsuario);
router.patch ('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

module.exports = router;
