var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');


var test = require('./routes/test');
var routes = require('./routes/index');

var user = require('./routes/user');
var users = require('./routes/users');
var profiles = require('./routes/profiles');
var address = require('./routes/address');
var userTypes = require('./routes/user-types');

var rooms = require('./routes/rooms');
var parts = require('./routes/parts');
var tables = require('./routes/tables');
var seats = require('./routes/seats');
var states = require('./routes/states');
var google_doc = require('./routes/google_doc');
//var main = require('./routes/main');


var app = express();


// view engine setup
app.set('view engine', 'hjs');
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static server for server index render only
//app.use(express.static(path.join(__dirname, 'public')));

// static server for ngbp client render in angularjs for example...
app.use(express.static(path.join(__dirname, 'public/build')));

// load all mongoose models from models folder
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

//app.use('/', routes);

app.use('/api/user', user);
app.use('/api/users', users);
app.use('/api/user-types', userTypes);
app.use('/api/profiles', profiles);
app.use('/api/address', address);

app.use('/api/rooms', rooms);
app.use('/api/parts', parts);
app.use('/api/tables', tables);
app.use('/api/seats', seats);
app.use('/api/states', states);
app.use('/api/test', test);
app.use('/google-doc', google_doc);

//app.use('/main', main);
app.use('/*', function(req, res){
    res.sendfile(__dirname + '/public/build/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    // connection to MongoDB with sqool_export DB
    mongoose.connect('mongodb://127.0.0.1:27017/T-Res');

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
