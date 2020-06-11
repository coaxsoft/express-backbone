module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Roles', [{
      roleName: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      roleName: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
