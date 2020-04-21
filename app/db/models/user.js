module.exports = (sequelize, DataTypes) => {
  const protectedFields = [
    'password'
  ];
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    google_id: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    password: DataTypes.STRING,
    verified_at: DataTypes.DATE
  }, {
    defaultScope: {
      attributes: { exclude: [...protectedFields] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    },
    getAuthFields: () => {
      return {
        email: this.email,
        first_name: this.first_name
      }
    }
  });
  User.associate = function(models) {
  };

  return User;
};