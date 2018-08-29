var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var config = require('./config');

// var appRoutes = require('./routes/index');

var app = express();

var message;
var dbMessage;
mongoose.connect(config.database, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.error(err);
    } else {
        dbMessage = 'MongoDB Database connected successfully';
        console.log(dbMessage);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', function (req, res) {
    res.render('index', {title: 'Express', version: '2.1'});
});

app.get('/test', function (req, res) {
    // res.render('index', {title: 'Express'});
    res.json({
        message: '"' + message + config.port + ' !!" And "' + dbMessage + '!!"'
    });
    // res.send('"Template server started @3000 !" And "MongoDB Database connected successfully"');
});

// app.use('/', appRoutes);
//
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
    } else {
        message = 'Template server started @';
        console.log(message + config.port);
    }
});

// module.exports = app;
