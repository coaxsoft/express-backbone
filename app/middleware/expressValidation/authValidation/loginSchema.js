const { checkSchema } = require('express-validator');
const { email } = require('../general');

module.exports = checkSchema({
  email
});
