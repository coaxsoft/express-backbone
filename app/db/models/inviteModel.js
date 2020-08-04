const uniqid = require("uniqid");
const faker = require("faker");

module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    email: DataTypes.STRING,
    inviteCode: DataTypes.STRING,
    status: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});

  Invite.constants = {
    newInvite: 0,
    acceptedInvite: 1,
    canceledInvite: 2,
  };

  Invite.generate = async (options) => {
    const entityToSave = {
      email: `${uniqid()}_${faker.internet.email()}`,
      inviteCode: faker.random.uuid(),
      status: faker.random.arrayElement([1, 2, 3]),
      authorId: null,
    };

    const response = await Invite.create({ ...entityToSave, ...options });

    return response;
  };

  return Invite;
};
