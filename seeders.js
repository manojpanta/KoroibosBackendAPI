var fs = require('fs');
var csv =  require('fast-csv');
const pg = require('pg')
var config = {
  user: "manojpanta",
  database: "koroibos_development",
  password: null,
  port: 5432,
  host: "localhost"
}
const pool = new pg.Pool(config);

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

let counter = 1;
let csvStream = csv.fromPath("./public/files/olympions.csv", {headers: true})
.on('data', (record)=>  {
  csvStream.pause();
  let id = counter;
  let name = record.Name;
  let team = record.Team;
  let age = record.Age;
  let sport = record.Sport;
  let createdAt = new Date();
  let updatedAt =  new Date();
  pool.query("INSERT INTO Olympians (id,name,team,age,sport,createdAt,updatedAt) \ VALUES($1,$2,$3,$4,$5,$6,$7)", [id,name,team,age,sport,createdAt,updatedAt], function(err) {
    if (err) {
      console.log(err);
    }
  });
  counter ++;
  csvStream.resume();
})
.on('end',function(end) {
  console.log('Finised Importing')
})
.on('err',function(err) {
  console.log(err);
})
