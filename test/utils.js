require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../app/db/models');

async function createUserAndFetchToken (options = {}) {
  const user = await User.generate({ ...options });

  const payload = user.getJWTFields();

  const jwtToken = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  return jwtToken;
}

module.exports = {
  createUserAndFetchToken,
};
