'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    sport: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Medalist);
    Event.belongsToMany(models.Olympian, {through: models.Medalist, foreignKey: 'EventId'});
  };
  return Event;
};
