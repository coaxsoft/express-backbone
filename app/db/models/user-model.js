const bcrypt = require('bcrypt');

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
    verified_at: DataTypes.DATE,
    full_name: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.first_name} ${this.last_name}`
      }
    }
  }, {
    tableName: 'users',
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
    User.hasOne(models.PasswordReset, { foreignKey: 'user_id' });
  };
  User.prototype.getJWTFields = function() {
    return {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name
    }
  };

  return User;
};