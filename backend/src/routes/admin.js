const express        = require('express');
const router         = express.Router();
const verificarAdmin = require('../middlewares/verificarAdmin');
const {
  getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, getStats,
  getInstituciones, createInstitucion, updateInstitucion, deleteInstitucion,
  getProgramas, createPrograma, updatePrograma, deletePrograma,
  getCuestionarios, createCuestionario, updateCuestionario, deleteCuestionario,
  getPreguntas, createPregunta, updatePregunta, deletePregunta,
} = require('../controllers/adminController');

router.use(verificarAdmin);

router.get('/stats', getStats);

router.get   ('/usuarios',     getUsuarios);
router.get   ('/usuarios/:id', getUsuario);
router.post  ('/usuarios',     createUsuario);
router.patch ('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

router.get   ('/instituciones',     getInstituciones);
router.post  ('/instituciones',     createInstitucion);
router.patch ('/instituciones/:id', updateInstitucion);
router.delete('/instituciones/:id', deleteInstitucion);

router.get   ('/programas',     getProgramas);
router.post  ('/programas',     createPrograma);
router.patch ('/programas/:id', updatePrograma);
router.delete('/programas/:id', deletePrograma);

router.get   ('/cuestionarios',     getCuestionarios);
router.post  ('/cuestionarios',     createCuestionario);
router.patch ('/cuestionarios/:id', updateCuestionario);
router.delete('/cuestionarios/:id', deleteCuestionario);

router.get   ('/preguntas',     getPreguntas);
router.post  ('/preguntas',     createPregunta);
router.patch ('/preguntas/:id', updatePregunta);
router.delete('/preguntas/:id', deletePregunta);

module.exports = router;
