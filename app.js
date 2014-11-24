var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');


var routes = require('./routes/index');
var user = require('./routes/user');
var userTypes = require('./routes/userTypes');
var rooms = require('./routes/rooms');
var parts = require('./routes/parts');
var tables = require('./routes/tables');
var seats = require('./routes/seats');
var states = require('./routes/states');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

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

app.use('/', routes);
app.use('/user', user);
app.use('/userTypes', userTypes);
app.use('/rooms', rooms);
app.use('/parts', parts);
app.use('/tables', tables);
app.use('/seats', seats);
app.use('/states', states);

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
    mongoose.connect('mongodb://127.0.0.1/sq_export');

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
