const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    productFor: {
        type: mongoose.Types.ObjectId,
        ref: 'productfors'
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