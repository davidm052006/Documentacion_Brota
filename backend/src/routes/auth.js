const express = require('express');

const router = express.Router();

const {
  forgotPassword,
  resetPassword
} = require('../controllers/autocontroller');

router.post(
  '/forgot-password',
  forgotPassword
);

router.post(
  '/reset-password',
  resetPassword
);

module.exports = router;