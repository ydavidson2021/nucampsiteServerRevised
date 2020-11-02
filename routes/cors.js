const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443']; // as array of string values
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) { //indexOf returns -1 if not found 
        corsOptions = { origin: true }; // check if origin can be found in the whitelist. Allow request to be accepted 
    } else {
        corsOptions = { origin: false }; 
    }
    callback(null, corsOptions); // no error has occured. give corsOption object
};

exports.cors = cors(); //return middleware cors of header access-allow-control-origin with wild card as a value. allow cors for all origin
exports.corsWithOptions = cors(corsOptionsDelegate); // return middleware function check if the incoming request belongs to whitelisted to 3000 or 3443. if it does, send back cors header access-control-allow-origin with whitelisted as the value