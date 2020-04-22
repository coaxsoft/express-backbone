module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    user_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    tableName: 'password_resets'
  });
  PasswordReset.associate = function(models) {
    PasswordReset.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return PasswordReset;
};