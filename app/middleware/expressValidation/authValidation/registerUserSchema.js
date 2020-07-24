const { checkSchema } = require('express-validator');
const passwordValidator = require('password-validator');

module.exports = checkSchema({
  firstName: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
  },
  lastName: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    custom: {
      options: (value) => {
        const schema = new passwordValidator();
        schema
          .is().min(1)
          .is().max(25);
        const passErrors = schema.validate(value, { list: true });
        if (passErrors.length === 0) return Promise.resolve();

        return Promise.reject(passErrors[0]);
      }
    },
  },
  //TODO clarify if we need password confirm

  // passwordConfirm: {
  //   custom: {
  //     options: (value, { req }) => {
  //       return value === req.body.password;
  //     }
  //   },
  // },
  email: {
    normalizeEmail: true,
    isEmail: true,
    // trim: true,
  }
});
