const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

//customize storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb callback function
        cb(null, 'public/images'); // null means no error, path is the public/images to access as static file in the outside world
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) //makes sure name of file in the server is the same as the file as the client side, if not multer will give random string by default 
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // rejects? expression. check if file expression is one of these 
        return cb(new Error('You can upload only image files!'), false); //reject file upload 
    }
    cb(null, true); //have filename extension that exists - accept file 
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter}); // call multer function. configure image file uploads

const uploadRouter = express.Router(); //set up Router

// http requests, only allow post 
uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => { // multer middleware(upload)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file); // multer adds object to the request object named file. File object contains info about the file. Confirm to the client that file has been received. 
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter; // export Router