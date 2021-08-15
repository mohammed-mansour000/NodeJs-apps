const mongoose = require('mongoose');

const geoSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const ninjaSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    //add geo location
    geometry: geoSchema 
});

module.exports = mongoose.model('ninja', ninjaSchema);