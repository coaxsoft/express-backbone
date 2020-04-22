const jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: (user) => {
    const userFields = user.getJWTFields();

    return jwt.sign(userFields, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  },
};