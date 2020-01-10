const mongoose = require('mongoose');

const trendingadsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('trendingads', trendingadsSchema);