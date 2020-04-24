const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  email: {
    normalizeEmail: true,
    isEmail: true,
    trim: true,
  },
  slug: {
    exists: true,
    trim: true,
  },
});
