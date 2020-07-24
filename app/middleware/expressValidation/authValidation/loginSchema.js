const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  email: {
    normalizeEmail: {
      options: {
        gmail_remove_dots: false
      }
    },
    isEmail: true,
    trim: true,
  }
});
