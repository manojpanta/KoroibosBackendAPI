'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('olympians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      team: {
        allowNull: true,
        type: Sequelize.STRING
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      sport: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_medals_won: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('olympians');
  }
};
