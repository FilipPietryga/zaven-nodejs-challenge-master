'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      passwordHash: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('Users', ['email'], {
      indexName: 'UX_Users_email',
      indicesType: 'UNIQUE'
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Users', {force: true});
  }
};
