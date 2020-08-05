module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        type: Sequelize.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }).then(function () {
      const roles = ['Admin', 'User'];

      queryInterface.sequelize.query(queryInterface.bulkInsert('Roles', roles.map(item => {
        return { roleName: item };
      })));
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Roles');
  }
};
