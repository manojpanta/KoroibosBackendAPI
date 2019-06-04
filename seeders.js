var fs = require('fs');
var csv =  require('fast-csv');
const Olympian = require('./models').Olympian
const Sport = require('./models').Sport
const Event = require('./models').Event
const Medalist = require('./models').Medalist

let counter = 0;
let csvStream = csv.fromPath("./public/files/olympions.csv", {headers: true})
.on('data', (record)=>  {
  csvStream.pause();
  let id = counter;
  let name = record.Name;
  let sex = record.Sex;
  let age = record.Age;
  let height = record.Height;
  if (record.Weight == 'NA'){
    var weight = null
  } else {
    var weight = record.Weight;
  }
  let team = record.Team;
  let games = record.Games;
  let sport = record.Sport;
  let event_name = record.Event;
  let medal = record.Medal;
  let createdAt = new Date();
  let updatedAt =  new Date();
  Event.findOrCreate({
    where: {
      name: event_name,
      sport: sport
    }
  }).then(event => {
    Olympian.findOrCreate({
      where: {
        name: name,
        team: team,
        age: age,
        sport: sport,
        weight: weight,
        sex: sex
      }
    }).then(olympian => {
      var olympian_id = olympian[0].id
      var event_id = event[0].id
      Medalist.findOrCreate({
        where: {
          OlympianId: olympian_id,
          EventId: event_id,
          medal: medal,
          name: name,
          team: team,
          age: age
        }
      })
    })
  });
  counter ++;
  csvStream.resume();
})
.on('end',function(end) {
  console.log('Finised Importing');
})
.on('err',function(err) {
  return console.log(err);
})

setTimeout(function() {
  process.exit();
}, 30000);
