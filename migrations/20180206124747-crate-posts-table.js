'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: Sequelize.TEXT,
      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.addIndex('Posts', ['authorId'], {
      indexName: 'IX_Posts_authorId'
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Posts', {force: true});
  }
};
