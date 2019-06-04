var express = require("express");
var router = express.Router();
var Event = require('../../../models').Event;
var Medalist = require('../../../models').Medalist;
var pry = require('pryjs')
const sequelize = require('sequelize')
var pry = require('pryjs')
const Op = sequelize.Op

router.get("/", function(req, res, next) {
  Event.findAll({
    attributes: ["sport",[sequelize.fn('array_agg', sequelize.col('name')), 'events']],
    group: 'sport'
  })
  .then(result => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(result));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});
router.get("/:id/medalists", function(req, res, next) {
  Event.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['name'],
    include: [{
      model: Medalist,
      where: { medal: { [Op.not]: 'NA' } },
      attributes: ['name', 'team', 'age', 'medal']
    }]
  })
  .then(result => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(result));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});
module.exports = router;
