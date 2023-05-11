const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    productFor: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('types', TypeSchema);