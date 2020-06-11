const { User, Role, Sequelize } = require('../db/models');
const { formPaginated, getOffset } = require('../functions/pagination');
const Op = Sequelize.Op;

async function getUser(req, res) {
  const { id } = req.params;
  const user = await User.findOne({ id: id });

  return res.json(user);
}

async function getUsers(req, res) {
  const { search, page, perPage: limit } = req.query;
  const offset = getOffset(page, limit);
  console.log(offset);
  let where = {};
  if (search) {
    where = {
      [Op.or]: [{
        email: {
          [Op.like]: `${search}%`
        }
      }, {
        firstName: {
          [Op.like]: `${search}%`
        }
      }, {
        lastName: {
          [Op.like]: `${search}%`
        }
      }]
    };
  }

  const users = await User.findAndCountAll({
    include: [{
      model: Role,
      attributes: ['id', 'roleName'],
      through: {
        attributes: []
      }
    }],
    where,
    offset,
    limit,
  });

  return res.json(formPaginated(users, page, limit));
}

async function deleteUser(req, res) {
  const { id } = req.params;
  await User.destroy({ where: { id } });

  return res.end();
}

async function restoreUser(req, res) {
  const { id } = req.params;
  await User.restore({ where: { id } });
  const user = await User.findOne({ where: { id } });

  return res.json(user);
}

async function addRole(req, res) {
  const { id, role_id } = req.params;
  const user = await User.findOne({ where: { id } });
  const role = await Role.findOne({ where: { id: role_id } });

  await user.addRoles(role);

  return res.json(user);
}

async function removeRole(req, res) {
  const { id, role_id } = req.params;
  const user = await User.findOne({ where: { id } });
  const role = await Role.findOne({ where: { id: role_id } });

  await user.removeRoles(role);

  return res.json(user);
}

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  restoreUser,
  addRole,
  removeRole
};