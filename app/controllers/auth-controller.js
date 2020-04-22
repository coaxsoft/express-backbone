const jwt = require('../functions/jwt');
const { User } = require('../db/models');

async function emailAuth(req, res) {

  const token = jwt.generateJWT(req.user);

  return res.json({ token });
}

async function register(req, res) {
  const { email, first_name, last_name, password } = req.body;

  await User.create({
    email,
    first_name,
    last_name,
    password
  });

  const user = await User.findOne({ where: { email } });

  return res.json({ user });
}

async function verify(req, res) {
  const { code } = req.params;
  //TODO add model  & logic

  return res.json(true);
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