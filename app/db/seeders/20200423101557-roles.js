'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [{
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
    return queryInterface.bulkDelete('roles', null, {});
  }
};
