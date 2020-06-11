const express = require('express');
const router = express.Router();

const passport = require('../middleware/passport');
const authController = require('../controllers/authController');
const registerSchema = require('../middleware/expressValidation/authValidation/registerUserSchema');
const loginSchema = require('../middleware/expressValidation/authValidation/loginSchema');
const resetPasswordSchema = require('../middleware/expressValidation/authValidation/resetPasswordSchema');
const resetPasswordCheckSchema = require('../middleware/expressValidation/authValidation/resetPasswordCheckSchema');
const validate = require('../middleware/expressValidation/validate');

router.post('/login', loginSchema, validate, passport.authenticate('local', { session: false }), authController.emailAuth);

router.post('/register', registerSchema, validate, authController.register);

router.get('/verify/:code', authController.verify);

router.post('/forgot-password', resetPasswordSchema, validate, authController.forgotPassword);

router.post('/check-forgot-password', resetPasswordCheckSchema, validate, authController.forgotPasswordCheck);

/**
 * requested scope should be allowed in google development console
 */
router.get('/google-login',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

router.get('/google-callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_DOMAIN}/login?status=failed` }),
  authController.googleAuth
);

router.get('/facebook-login',
  passport.authenticate('facebook')
);

router.get('/facebook-callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_DOMAIN}/login?status=failed` }),
  authController.facebookAuth
);

module.exports = router;
