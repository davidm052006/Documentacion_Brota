const express = require('express');

const router = express.Router();

const {
  forgotPassword,
  resetPassword
<<<<<<< HEAD
} = require('../controllers/authController');
=======
} = require('../controllers/autocontroller');
>>>>>>> 638330c (Cambios de recueracion de contraseña)

router.post(
  '/forgot-password',
  forgotPassword
);

router.post(
  '/reset-password',
  resetPassword
);

module.exports = router;
