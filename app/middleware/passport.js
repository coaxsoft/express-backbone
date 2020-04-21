const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const moment = require('moment');

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  passReqToCallback: true
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, async function (email, password, done) {
    try {
      const user = await User.scope(['withPassword']).findOne({ where: { email } });

      if (!user || !user.password) {
        return done({ status: 401, message: 'Email or password is wrong' });
      }

      if (user.verified_at === null) {
        return done({ status: 403, message: 'Verify your email first' })
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (passwordCompare === false) {
        return done({ status: 401, message: 'Email or password is wrong' });
      }

      return done(null, user.getAuthFields());
    } catch (e) {
      return done(e);
    }
  }
));

passport.use(new JwtStrategy(jwtOpts, async function (req, jwt_payload, done) {
  return done(null, { ...jwt_payload });
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACK
}, async function (accessToken, refreshToken, profile, done) {

  if (!profile._json.email) done(new Error('email is missing'));

  let user = await User.findOne({ where: { email: profile._json.email } });

  if (!user) {
    user = await User.create({
      email: profile._json.email,
      google_id: profile._json.sub,
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      verified_at: moment.now()
    });
  }

  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK,
  profileFields: ['id', 'displayName', 'name', 'email']
}, async function (accessToken, refreshToken, profile, done) {

  let user = await User.findOne({ where: { email: profile._json.email } });

  if (!user) {
    user = await User.create({
      email: profile._json.email,
      google_id: profile._json.id,
      first_name: profile._json.first_name,
      last_name: profile._json.last_name,
      verified_at: moment.now()
    });
  }

  return done(null, user);
}));

module.exports = passport;
