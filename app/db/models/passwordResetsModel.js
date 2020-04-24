module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    userId: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {});
  PasswordReset.associate = function(models) {
    PasswordReset.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return PasswordReset;
};