const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const auth = require('../controllers/auth-controller');

router.post('/login', passport.authenticate('local', { session: false }), auth.emailAuth);

router.post('/register', auth.register);

router.get('/verify/:code', auth.verify);

router.post('/forgot-password', auth.forgotPassword);

router.get('/forgot-password/:hash', auth.forgotPasswordCheck);

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
