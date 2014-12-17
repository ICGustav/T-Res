var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET seats listing. */
router.get('/', function(req, res) {
  mongoose.model('seats').find({}).sort({order:1}).exec(function (err, seats){
    mongoose.model('seats').populate(seats, {path: 'state'}, function(err, seats) {
      mongoose.model('seats').populate(seats, {path: 'table'}, function(err, seats) {
        console.log(seats);
        res.send(seats);
      });
    });
  });
});

/* DELETE Seat from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('seats').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return function (){
        mongoose.model('seats').find({}).exec(function (err, seats){
          mongoose.model('seats').populate(seats, {path: 'state'}, function(err, seats) {
            res.send(seats);
          });
        });
      };
    } else {
      console.log(err);
    }
  });
});

/* POST of adding a seat. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddSeatSchema = mongoose.model('seats');
  var addedSeat = new AddSeatSchema(req.body);

  console.log("SAVE: Seat Object with state: "+addedSeat.state + " to seat order " + addedSeat.order);
  return addedSeat.save(function (err) {
    if (!err) {
      res.send(addedSeat);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying seat. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Seat Object with state: "+req.body.state + " to seat order " + req.body.order);
  return mongoose.model('seats').findOne({_id: req.body._id}, function (err, seat) {
    if (!err) {
      seat.full_name = req.body.full_name;
      //new mongoose.Schema.ObjectId();
      seat.state = req.body.state;
      seat.table = req.body.table;
      seat.save();
      mongoose.model('tables').findOne({_id: req.body.table}, function (err, table) {
        if (!err) {
          var seat = {_id: req.body._id};
          //var seat = req.body._id;
          table.table_seats.push(seat);
          table.save();
          console.log("modified");
          return res.send(seat);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

/* GET seats and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('seats').find({}).sort({order:1}).exec(function (err, seats){
    var outputFilename = "data/seats_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(seats, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(seats);
  });
});

module.exports = router;
