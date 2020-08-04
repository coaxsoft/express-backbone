const { checkSchema } = require('express-validator');
const { email } = require('../general');
module.exports = checkSchema({
  email,
  slug: {
    exists: true,
    trim: true,
  },
});
