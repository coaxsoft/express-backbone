const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const protectedFields = [
    'password'
  ];
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    password: DataTypes.STRING,
    verifiedAt: DataTypes.DATE,
    fullName: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.firstName} ${this.lastName}`
      }
    }
  }, {
    paranoid: true,
    hooks: {
      beforeCreate: async user => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async user => {
        if (user._changed.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    },
    defaultScope: {
      attributes: { exclude: [...protectedFields] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
  });
  User.associate = function(models) {
    User.hasOne(models.PasswordReset, { foreignKey: 'userId' });
    User.belongsToMany(models.Role, { through: 'Role_User', foreignKey: 'userId', timestamps: false })
  };
  User.prototype.getJWTFields = function() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    }
  };

  return User;
};