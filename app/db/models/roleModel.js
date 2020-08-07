module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: 'RoleUser', foreignKey: 'roleId', timestamps: false });
  };

  return Role;
};
