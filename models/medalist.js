'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medalist = sequelize.define('Medalist', {
    OlympianId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    medal: DataTypes.STRING,
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  Medalist.associate = function(models) {
    Medalist.belongsTo(models.Olympian,{foreignKey: 'OlympianId'});
    Medalist.belongsTo(models.Event,{foreignKey: 'EventId'});
  };
  return Medalist;
};
