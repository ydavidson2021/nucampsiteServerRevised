const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const { pluralize } = require('mongoose');

const favoriteRouter = express.Router(); //set up Router
favoriteRouter.use(bodyParser.json());

// http requests, only allow post 
favoritedRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { // multer middleware(upload)
    Favorite.findOne({user: req.user._id })
    .then(favorite => {
        if (favorite) {
            req.body = [{"_id":"campsite ObjectId"},{"_id":"campsite ObjectId"},];
            favorite.push(req.body);
            favorite.save() // save to mongodb database - not static , not uppercase - returns a promise
            .then (favorite=> {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));            
        } else {
            Favorite.create(req.body)
            favorite.push(req.body);
            favorite.save()
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
    })
    .catch(err => next(err));
})
    if(campsites.indexOf(req.body[{"_id":"campsite ObjectId"}, {"_id":"campsite ObjectId"}] !== -1) { //indexOf returns -1 if not found 
        corsOptions = { origin: true }; // check if origin can be found in the whitelist. Allow request to be accepted 
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite); // multer adds object to the request object named file. File object contains info about the file. Confirm to the client that file has been received. 
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOneAndDelete({user: req.user._id })
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite); 
    })
    .catch(
        res.setHeader('Content-Type', 'text/plain');
        res.end('You do not have any favorites to delete.');
    );
});



favoritedRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { // multer middleware(upload)
    Favorite.findOne();
    if(req.params.campsiteId); {
        favorites.campsites.push(req.params.campsiteId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file); 
    } else if (!req.params.campsiteId) {
        res.end('That campsite is already in the list of favorites!');
    } else {
        Favorite.create(); 
        favorites.campsites.push(req.params.campsiteId));
    }
)
    
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser,  (req, res) => {
    Favorite.findOne();
    if(favorites){
        const index = favorites.campsites.indexOf((rew.params.campsiteId); 
        if (index !== -1) {
            favorites.campsites.splice(index, 1);
        }
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.end('You do not have any favorites to delete.');
    }   
});
module.exports = uploadRouter; // export Router