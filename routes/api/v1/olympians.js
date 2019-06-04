var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var pry = require('pryjs')

router.get("/", function(req, res, next) {

  if (req.query.age == 'youngest') {
    Olympian.findAll({
      attributes: ['id','name', 'team', 'age', 'sport'],
      order: [['age', 'ASC']]
    })
    .then(olympians => {
      getTotalmedals(olympians)
      .then(result=> {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(result[0]));

      })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else if (req.query.age == 'oldest') {
    Olympian.findAll({
      attributes: ['id','name', 'team', 'age', 'sport'],
      order: [['age', 'DESC']]
    })
    .then(olympians => {
      getTotalmedals(olympians)
      .then(result=> {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(result[0]));

      })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  }else {
    Olympian.findAll({
      attributes: ['id','name', 'team', 'age', 'sport']
    })
    .then(olympians => {
      getTotalmedalss(olympians)
      .then(result=> {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(result));

      })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  }
});

function getTotalmedalss(olympians) {
  return new Promise((resolve, reject) => {
    resolve(olympians.map(function(olympian) {
      var r = olympian.toJSON()
      olympian.getTotalmedals()
      .then(async result => {
        console.log(result);
        r.total_medals_won = await result
      })
      .catch(error=> {
        console.log(error);
      })
      return r
    })
    )
  })
};
module.exports = router;
