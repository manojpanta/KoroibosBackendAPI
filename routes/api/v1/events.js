var express = require("express");
var router = express.Router();
var Event = require('../../../models').Event;
var pry = require('pryjs')

router.get("/", function(req, res, next) {
  Event.findAll({
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
});
module.exports = router;
