var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];
  //res.render('main', { title: 'Express', someValue: 'Some Value', body: '<p> Here is a body... </p>' });
  res.render('main',{ basketballPlayers: basketballPlayers });
});

module.exports = router;
