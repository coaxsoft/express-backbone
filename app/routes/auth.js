const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const auth = require('../controllers/auth');

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
