module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING
  }, {
    tableName: 'roles'
  });
  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: 'role_user', foreignKey: 'role_id', timestamps: false });
  };

  return Role;
};