const passport = require('passport'); //middleware
const LocalStrategy = require('passport-local').Strategy; //strategy constructor
const User = require('./models/user'); //user model - user schema has access to passport local mongoose
const JwtStrategy = require('passport-jwt').Strategy; //jwtStrategy constructor from the passowrt jwt library
const ExtractJwt = require('passport-jwt').ExtractJwt; //helper methods
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');
const { NotExtended } = require('http-errors');

exports.local = passport.use(new LocalStrategy(User.authenticate())); //add specific strategy plugin , verify callback function
passport.serializeUser(User.serializeUser()); //session based authentication
passport.deserializeUser(User.deserializeUser()); //session based authentication 

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

exports.verifyAdmin = function(req, res, next) { 
    if (req.user.admin) {
        return next();
    } else {
        const err = new Error('You are not authorized to perform this operation');
        err.status = 403;
        return next(err);
    }
};


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

//Task 1 


exports.verifyUser = passport.authenticate('jwt', {session: false});
