// const { User } = require('../db/models');

async function googleAuth(req, res, next) {
  return res.json({ user: req.user });
}

async function facebookAuth(req, res, next) {
  return res.json({ user: req.user });
}

module.exports = {
  googleAuth,
  facebookAuth
};