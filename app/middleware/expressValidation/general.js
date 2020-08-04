const passwordValidator = require('password-validator');

module.exports = {
  email: {
    normalizeEmail: {
      options: {
        gmail_remove_dots: false
      }
    },
    isEmail: true,
    trim: true,
  },
  password: {
    in: ['body'],
    isString: true,
    exists: true,
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
  }
}
