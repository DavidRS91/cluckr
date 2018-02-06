var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var clucks = require('./routes/clucks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = null;
  if (username) {
    res.locals.username = username;
  }
  next();
});

app.locals.timeElapsed = function timeElapsed(ms) {
  switch (true) {
    case (ms <= 1000 * 60 * 60):
    return `${Math.floor(ms/(1000*60))} minutes ago`
    break;
    case (ms <= 1000 * 60 * 60 * 24):
    return `${Math.floor(ms/(1000*60*60))} hours ago`
    break;
    case (ms <= 1000 * 60 * 60 * 24 * 365):
    return `${Math.floor(ms/(1000*60*60*24))} days ago`
    break;
    default:
    return `${Math.floor(ms/(1000*60*60*24*365))} years ago`
    break;

  }
};

app.use('/', index);
app.use('/clucks', clucks);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
