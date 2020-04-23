module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    email: DataTypes.STRING,
    invite_code: DataTypes.STRING,
    status: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {
    tableName: 'invites'
  });
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