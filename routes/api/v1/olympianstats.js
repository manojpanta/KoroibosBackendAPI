var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
const sequelize = require('sequelize')
var pry = require('pryjs')
const Op = sequelize.Op
router.get("/", async function(req, res, next) {
  try {
    const total_olympians = await Olympian.findAndCountAll({});
    const avg_male_weight = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('weight')), 'averageWeight']],
      where: {sex: 'M'}
    });
    const avg_female_weight = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('weight')), 'averageWeight']],
      where: {sex: 'F'}
    });
    const avg_age = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'averageAge']],
    });
    const unit = 'kg'
    const stat = {
      olympian_stats: {
        total_competing_olympians: total_olympians.count,
        average_weight: {
          unit: unit,
          male_olympians: Math.round(avg_male_weight[0].dataValues.averageWeight),
          female_olympians: Math.round(avg_female_weight[0].dataValues.averageWeight)
        },
        average_age: Math.round(avg_age[0].dataValues.averageAge)
      }
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(stat));
  }catch(error){
    console.log('this is ');
  }
});
module.exports = router;
