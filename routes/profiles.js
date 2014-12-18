var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET User's profile listing. */
router.get('/', function(req, res) {
  mongoose.model('profiles').find({}).sort({last_name:1}).exec(function (err, profiles){
    mongoose.model('profiles').populate(profiles, {path: 'user'}, function (err, profiles) {
      res.send(profiles);
    });
  });
});

/* DELETE User profile from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('profiles').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* POST of adding a User profile. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddProfileSchema = mongoose.model('profiles');
  var addedUserProfile = new AddProfileSchema(req.body);

  console.log("SAVE: User profile Object with email: "+addedUserProfile.email);
  return addedUserProfile.save(function (err) {
    if (!err) {
      res.send(addedUserProfile);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying User profile. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: User profile Object with email: "+req.body.email);
  return mongoose.model('profiles').findOne({_id: req.body._id}, function (err, profile) {
    if (!err) {
      if (req.body.user._id) { profile.user = req.body.user._id; }
      profile.first_name = req.body.first_name;
      profile.last_name = req.body.last_name;
      profile.email = req.body.email;
      profile.mobil = req.body.mobil;
      profile.save();
      console.log("modified");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* GET User's profiles and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('profiles').find({}).sort({last_name:1}).exec(function (err, profiles){
    mongoose.model('profiles').populate(profiles, {path: 'user'}, function (err, profiles) {
      var outputFilename = "data/profiles_out.json";

      fs.writeFileSync(outputFilename, JSON.stringify(profiles, null, '\t'));
      console.log("JSON saved to " + outputFilename);

      res.send(profiles);
    });
  });
});

module.exports = router;
