var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog'); //importing catalog route

var app = express();

//MongoDB, Mongoose Stuff
//Default connection to database
var mongoose = require('mongoose');
var mongoDB = 


mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
//Binds error event (errors print to console)
db.on('error', console.error.bind(console,'MongoDB Connection Error:'))

// view engine setup
//first specify folder where templates are stored
app.set('views', path.join(__dirname, 'views'));
//Use template library pug
app.set('view engine', 'pug');

//Setting up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Serve static files in public directory (idk what that means)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
