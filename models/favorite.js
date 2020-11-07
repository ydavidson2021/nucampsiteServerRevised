const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({
    user: {
        type: type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    campsites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campsite'
    }]
}, {
    timestamps: true
});

const Favorite= mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;