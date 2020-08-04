const { checkSchema } = require('express-validator');
const { email, password } = require('../general');

module.exports = checkSchema({
  email,
  password,
  firstName: {
    in: ['body'],
    exists: true,
    isString: true,
  },
  lastName: {
    in: ['body'],
    exists: true,
    isString: true,
  },

  //TODO clarify if we need password confirm

  // passwordConfirm: {
  //   custom: {
  //     options: (value, { req }) => {
  //       return value === req.body.password;
  //     }
  //   },
  // },

});
