const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: (user) => {
    const userFields = user.getJWTFields();

    return jwt.sign(userFields, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  },
  verifyJWT: (token) => {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (e) {
      return false;
    }
  }
};