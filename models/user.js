//create mongoose user schema and model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //document fields
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);