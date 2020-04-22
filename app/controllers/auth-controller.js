const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { User, PasswordReset } = require('../db/models');
const { sendVerifyEmail } = require('../emails/verify-account-email');
const jwt = require('../functions/jwt');
const { sendResetPasswordEmail } = require('../emails/reset-password-email');

async function emailAuth(req, res) {

  const token = jwt.generateJWT(req.user);

  return res.json({ token });
}

async function register(req, res, next) {
  const { email, first_name, last_name, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) return next({ status: 409 }); //409 Conflict

  await User.create({
    email,
    first_name,
    last_name,
    password
  });

  const user = await User.findOne({ where: { email } });
  sendVerifyEmail(user);

  return res.json({ user });
}

async function verify(req, res, next) {
  const { code } = req.params;
  const decodedUser = jwt.verifyJWT(code);
  if (!decodedUser) {
    return next({ status: 401 }); //TODO is that correct code?
  }

  const user = await User.findOne({ where: { email: decodedUser.email } });

  if (!user) return next({ status: 404 });
  user.verified_at = moment.now();

  return res.json({ user });
}

async function forgotPassword(req, res, next) {
  const { email, slug } = req.body;
  const user = await User.findOne({ where: { email }, include: [{ model: PasswordReset }] });

  if (!user) return next({ status: 404 });

  const code = await PasswordReset.create({
    code: uuidv4()
  });

  if (user.PasswordReset) user.PasswordReset.destroy();

  await user.setPasswordReset(code);

  sendResetPasswordEmail(user, req.headers.host, slug);

  return res.json(true);
}

async function forgotPasswordCheck(req, res, next) {
  const { code, password } = req.body;

  const user = await User.findOne({
    include: [{
      model: PasswordReset,
      where: {
        code
      }
    }]
  });

  if (!user) return next({ status: 404 });

  user.PasswordReset.destroy();
  user.password = password;
  user.save();

  return res.end();
}

async function googleAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.redirect(`${process.env.CLIENT_DOMAIN}/login/${token}`);
}

async function facebookAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.redirect(`${process.env.CLIENT_DOMAIN}/login/${token}`);
}

module.exports = {
  googleAuth,
  facebookAuth,
  emailAuth,
  register,
  verify,
  forgotPassword,
  forgotPasswordCheck
};