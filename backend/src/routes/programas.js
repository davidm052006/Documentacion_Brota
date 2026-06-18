const express = require('express');
const router  = express.Router();
const { obtenerProgramas, obtenerEstadisticas } = require('../controllers/programasController');

// GET /api/programas/stats   — conteo total + por área
router.get('/stats', obtenerEstadisticas);

// GET /api/programas         — lista paginada con filtros ?area=&search=&page=&limit=
router.get('/', obtenerProgramas);

module.exports = router;
