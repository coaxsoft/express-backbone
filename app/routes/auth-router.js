const express = require('express');
const router = express.Router();

const passport = require('../middleware/passport');
const auth = require('../controllers/auth-controller');
const registerSchema = require('../middleware/express-validation/register-user-schema');
const resetPasswordSchema = require('../middleware/express-validation/reset-password-schema');
const resetPasswordCheckSchema = require('../middleware/express-validation/reset-password-check-schema');
const validate = require('../middleware/express-validation/validate');

router.post('/login', passport.authenticate('local', { session: false }), auth.emailAuth);

router.post('/register', registerSchema, validate, auth.register);

router.get('/verify/:code', auth.verify);

router.post('/forgot-password', resetPasswordSchema, validate, auth.forgotPassword);

router.post('/check-forgot-password', resetPasswordCheckSchema, validate, auth.forgotPasswordCheck);

/**
 * requested scope should be allowed in google development console
 */
router.get('/google-login',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

router.get('/google-callback',
  passport.authenticate('google', { failureRedirect: '/login' }), //TODO clarify redirect direction
  auth.googleAuth
);

router.get('/facebook-login',
  passport.authenticate('facebook')
);

router.get('/facebook-callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), //TODO clarify redirect direction
  auth.facebookAuth
);

module.exports = router;
