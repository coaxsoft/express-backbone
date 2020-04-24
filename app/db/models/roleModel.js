module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: 'Role_User', foreignKey: 'roleId', timestamps: false });
  };

  return Role;
};