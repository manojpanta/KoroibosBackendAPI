'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medalists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OlympianId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Olympians',
         key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL'
      },
      medal: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      EventId: {
        type: Sequelize.INTEGER,
        references: {
         model: 'Events',
         key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Medalists');
  }
};
