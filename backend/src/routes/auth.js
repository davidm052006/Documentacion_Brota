const express = require('express');

const router = express.Router();

const {
  forgotPassword,
  resetPassword
<<<<<<< HEAD
} = require('../controllers/autocontroller');
=======
} = require('../controllers/authcontroller');
>>>>>>> 93228f4b2770e98df7483ef5594409beac220ed8

router.post(
  '/forgot-password',
  forgotPassword
);

router.post(
  '/reset-password',
  resetPassword
);

module.exports = router;