const { checkSchema } = require('express-validator');
const { password } = require("../general")

module.exports = checkSchema({
  code: {
    in: ['body'],
    exists: true,
    isString: true
  },
  password,
  //TODO clarify if we need password confirm

  // passwordConfirm: {
  //   custom: {
  //     options: (value, { req }) => {
  //       return value === req.body.password;
  //     }
  //   },
  // },
});
