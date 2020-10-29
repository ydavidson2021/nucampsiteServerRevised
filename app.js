var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // first class function. Function returning another function
const passport = require('passport');
const authenticate = require('./authenticate');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Week 2 Express Generator Exercise 
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

//connect to MongoDb server 
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321')); // secret key, cryptographic key to sign the cookie to send to client

app.use(session({ //session middleware
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false, //option. when new session is created but no updates, it wont be saved. empty - no cookie sent to client
  resave: false, //once session is created, continue to resave even not updated. 
  store: new FileStore() //create new FileStore as an object to save session information to the server's hard disk rather than instead of running app memory
}));

//session-based authentication only 
app.use(passport.initialize());
app.use(passport.session());

// moved so users can create account and be directed to indexRouter if they log out
app.use('/', indexRouter);
app.use('/users', usersRouter);

//this is where we'll add authentication
function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
      const err = new Error('You are not authenticated!');                    
      err.status = 401;
      return next(err);
  } else {
      return next();
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


//Week 2 Express Generator Exercise
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

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
