'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('roles', [{
      role_name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role_name: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
