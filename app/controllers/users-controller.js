const { User, Role, Sequelize } = require('../db/models');
const Op = Sequelize.Op;

async function getUser(req, res, next) {
  const { id } = req.params;
  const user = await User.findOne({ id });

  return res.json({ id: 1, email: 'test@test.test', firstName: 'first_name', lastName: 'last_name' });
}

async function getUsers(req, res, next) {

  const { search } = req.query;

  const users = await User.findAll({
    include: [{
      model: Role,
      attributes: ['id', 'role_name'],
      through: {
        attributes: []
      }
    }],
    where: {
      [Op.or]: [{
        email: {
          [Op.like]: `${search}%`
        }
      }, {
        first_name: {
          [Op.like]: `${search}%`
        }
      }, {
        last_name: {
          [Op.like]: `${search}%`
        }
      }]
    }
  });

  return res.json(users);
}

module.exports = {
  getUser,
  getUsers
};