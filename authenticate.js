const passport = require('passport'); //middleware
const LocalStrategy = require('passport-local').Strategy; //strategy constructor
const User = require('./models/user'); //user model - user schema has access to passport local mongoose

exports.local = passport.use(new LocalStrategy(User.authenticate())); //add specific strategy plugin , verify callback function
passport.serializeUser(User.serializeUser()); //session based authentication
passport.deserializeUser(User.deserializeUser()); //session based authentication 