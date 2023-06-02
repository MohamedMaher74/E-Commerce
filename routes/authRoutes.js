const express = require('express');

const {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
} = require('../utils/validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../controllers/authController');

const {
  uploadUserImage,
  resizeImage,
} = require('../controllers/userController');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', uploadUserImage, resizeImage, signupValidator, signup);

router.post('/login', loginValidator, login);

router.post('/forgotPassword', forgotPassword);

router.post('/verifyResetCode', verifyPassResetCode);

router.post(
  '/resetPassword',
  authController.protect,
  resetPasswordValidator,
  resetPassword
);

module.exports = router;
