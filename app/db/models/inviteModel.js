module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    email: DataTypes.STRING,
    inviteCode: DataTypes.STRING,
    status: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  Invite.associate = function(models) {
    // associations can be defined here
  };

  Invite.constants = {
    newInvite: 0,
    acceptedInvite: 1,
    canceledInvite: 2,
  };

  return Invite;
};