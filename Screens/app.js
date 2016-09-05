var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// session management:
var sessions = require('client-sessions');

// DB:
var mongoose = require('mongoose');
// Database connection and Schemas:
mongoose.connect('mongodb://localhost/smart-screens');
require('./models/Screens');
require('./models/Urls');
require('./models/Users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('port', process.env.PORT || 3333);

app.locals.appName = "Smart Screens";
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));


// use sessions:
app.use(sessions({
    cookieName: 'session',
    secret: 'asdarweasz1iusadnbcuiasobsauidcwac9232oiqc',
    duration: 30 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    ephemeral: true,
    httpOnly: true,
    secure: false
}));

var screensRoute = require('./routes/screens');
app.use('/screens', screensRoute);

var indexRoute = require('./routes/index');
app.use('/', indexRoute);

var urlRoute = require('./routes/urls');
app.use('/urls', urlRoute);

app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    
});

/*var piRoute = require('./routes/pi');
app.use('/pi', piRoute);*/

module.exports = app;
