const { User } = require('../db/models');

async function getUser(req, res, next) {
  const { id } = req.params;
  const user = await User.findOne({ id });

  return res.json({ id: 1, email: 'test@test.test', firstName: 'first_name', lastName: 'last_name' });
}

module.exports = {
  getUser
};