const express = require('express');
const router = express.Router();

const {
  obtenerCuestionario,
  guardarResultado,
  obtenerResultado,
  eliminarResultado,
  obtenerPerfil
} = require('../controllers/perfilController');

// GET    /api/perfil/cuestionario              — preguntas del test activo
router.get('/cuestionario', obtenerCuestionario);

// POST   /api/perfil/resultado                 — guardar resultado del test
router.post('/resultado', guardarResultado);

// GET    /api/perfil/resultado/:perfilUsuarioId — último resultado de un usuario
router.get('/resultado/:perfilUsuarioId', obtenerResultado);

// DELETE /api/perfil/resultado/:perfilUsuarioId — borrar todos los resultados
router.delete('/resultado/:perfilUsuarioId', eliminarResultado);

// GET    /api/perfil/:userId                   — perfil completo del usuario
router.get('/:userId', obtenerPerfil);

module.exports = router;
