const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    photoUrl: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    cart: [
        {

        }
    ],
    timeCreated: {
        type: Date,
        default: Date.now(),
    },
    timeUpdated: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('auths', authSchema)