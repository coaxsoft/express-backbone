const { User } = require('../db/models');

async function getUser(req, res, next) {
  const { id } = req.params;
  const user = await User.findOne({ id });

  return res.json({ id: 1, email: 'test@test.test', firstName: 'first_name', lastName: 'last_name' });
}

async function test(req, res, next) {

  request
    .then((result) => {
      console.log(result.body);
      return res.json({ res: result.body });
    })
    .catch((err) => {
      console.log(err.statusCode);
      return res.json({ err: err.statusCode });
    })

}

module.exports = {
  getUser,
  test
};