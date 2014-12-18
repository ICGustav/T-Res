var express = require('express');
var hogan = require('hogan');
var router = express.Router();

router.get('/test1', function(req, res){
    var basketballPlayers = [
        {name: 'Lebron James', team: 'the Heat'},
        {name: 'Kevin Durant', team: 'the Thunder'},
        {name: 'Kobe Jordan',  team: 'the Lakers'}
    ];

    var days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    var data = {
        basketballPlayers: basketballPlayers,
        days: days
    };

    var template = hogan.compile("@{{data}}");
    res.render('loop', template);
});

module.exports = router;