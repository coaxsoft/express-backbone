const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User, Role } = require('../db/models');
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

      if (user.verifiedAt === null) {
        return done({ status: 403, message: 'Verify your email first' })
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (passwordCompare === false) {
        return done({ status: 401, message: 'Email or password is wrong' });
      }

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

passport.use(new JwtStrategy(jwtOpts, async function (req, jwt_payload, done) {
  const user = await User.findOne({
    where: {
      email: jwt_payload.email
    }, include: [{
      model: Role,
      attributes: ['id', 'roleName'],
      through: {
        attributes: []
      }
    }]
  });

  return done(null, user);
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
      googleId: profile._json.sub,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      verifiedAt: moment.now()
    });
  }

  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK,
  profileFields: ['id', 'displayName', 'name', 'email'] //This is a scope claims. Without it most of the fields will be blank
}, async function (accessToken, refreshToken, profile, done) {

  let user = await User.findOne({ where: { email: profile._json.email } });

  if (!user) {
    user = await User.create({
      email: profile._json.email,
      facebookId: profile._json.id,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      verifiedAt: moment.now()
    });
  }

  return done(null, user);
}));

module.exports = passport;
