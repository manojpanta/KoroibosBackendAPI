var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
const sequelize = require('sequelize')
var pry = require('pryjs')
const Op = sequelize.Op

router.get("/", function(req, res, next) {
  if (req.query.age == 'youngest') {
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport'],
      order: [['age', 'ASC']]
    })
    .then(olympians => {
      olympian = olympians[0]
      let formattedOlympian = {
        name: olympian.name,
        team: olympian.team,
        age: olympian.age,
        sport: olympian.sport,
        total_medals_won: olympian.Medalists.length
      };
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(formattedOlympian));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else if (req.query.age == 'oldest') {
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport'],
      order: [['age', 'DESC']]
    })
    .then(olympians => {
      olympian = olympians[0]
      let formattedOlympian = {
        name: olympian.name,
        team: olympian.team,
        age: olympian.age,
        sport: olympian.sport,
        total_medals_won: olympian.Medalists.length
      };
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(formattedOlympian));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  }else {
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport']
    })
    .then(olympians => {
      return olympians.map(function (olympian){
        let formattedOlympian = {
          name: olympian.name,
          team: olympian.team,
          age: olympian.age,
          sport: olympian.sport,
          total_medals_won: olympian.Medalists.length
        };
        return formattedOlympian;
      })
    })
    .then(result=> {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({olympians: result}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  }
});
module.exports = router;
