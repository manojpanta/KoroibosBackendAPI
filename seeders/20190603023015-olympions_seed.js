'use strict';
var fs = require('fs');
var csv =  require('fast-csv');
module.exports = {
  up: (queryInterface, Sequelize) => {
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('olympians', null, {});
  }
};
