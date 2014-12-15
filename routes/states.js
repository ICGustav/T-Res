var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET states listing. */
router.get('/', function(req, res) {
  mongoose.model('states').find({}).exec(function (err, states){
    res.send(states);
  });
});

/* POST of modifying states. */

/* GET states and export them to file. */
router.get('/write', function(req, res) {
  mongoose.model('states').find({}).exec(function (err, states){
    var outputFilename = "data/states_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(states, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(states);
  });
});

module.exports = router;
