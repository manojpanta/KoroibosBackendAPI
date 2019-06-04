'use strict';
const sequelize = require('sequelize')
var pry = require('pryjs')
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sport: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    sex: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasMany(models.Medalist);
    Olympian.belongsToMany(models.Event, {through: models.Medalist, foreignKey: 'OlympianId'});
  };
  Olympian.prototype.getTotalmedals = function() {
    return new Promise((resolve, reject) => {
      var id = this.id;
      sequelize.query(`SELECT COUNT(*) FROM \"Medalists\" m  WHERE m.\"OlympianId\" = ${id} AND m.medal != \'NA\'`, { type: sequelize.QueryTypes.SELECT})
      .then(function(count) {
        var count = count[0].count
        resolve(count)
      })
    })
  }
  return Olympian;
};
