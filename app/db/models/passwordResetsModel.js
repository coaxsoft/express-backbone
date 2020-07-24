const faker = require("faker");

module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    userId: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {});
  PasswordReset.associate = function(models) {
    PasswordReset.belongsTo(models.User, { foreignKey: 'userId' });
  };

  PasswordReset.generate = async (options) => {
    const entityToSave = {
      userId: null,
      code: faker.random.uuid()
    };

    const response = await PasswordReset.create({ ...entityToSave, ...options });

    return response;
  };

  return PasswordReset;
};
