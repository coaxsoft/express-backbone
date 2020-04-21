// const { User } = require('../db/models');

async function googleAuth(req, res, next) {
  return res.json({ success: true });
}

async function facebookAuth(req, res, next) {
  return res.json({});
}

module.exports = {
  googleAuth,
  facebookAuth
};