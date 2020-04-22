const moment = require('moment');
const { User } = require('../db/models');
const { sendVerifyEmail } = require('../emails/verify-account-email');
const jwt = require('../functions/jwt');

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

async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  //TODO send reset-pasword email

  return res.json(true);
}

async function forgotPasswordCheck(req, res) {
  const { hash } = req.params;

  return res.redirect(); //TODO redirect
}

async function googleAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.json({ token });
}

async function facebookAuth(req, res) {
  const token = jwt.generateJWT(req.user);

  return res.json({ token });
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