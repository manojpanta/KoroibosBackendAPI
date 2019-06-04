'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medalist = sequelize.define('Medalist', {
    OlympianId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    medal: DataTypes.STRING
  }, {});
  Medalist.associate = function(models) {
    Medalist.belongsTo(models.Olympian,{foreignKey: 'OlympianId'});
    Medalist.belongsTo(models.Event,{foreignKey: 'EventId'});
  };
  return Medalist;
};
