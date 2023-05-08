const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductForSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    img: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    timeCreated: {
        type: Date,
        default: Date.now(),
    },
    timeUpdated: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('productfors', ProductForSchema);