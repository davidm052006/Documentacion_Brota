const express = require('express');
const router  = express.Router();
const { crearContacto } = require('../controllers/contactoController');

router.post('/', crearContacto);

module.exports = router;
