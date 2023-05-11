const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },

    img: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    productFor: {
        type: String,
        ref: 'types'
    },

    type: {
        type: mongoose.Types.ObjectId,
        ref: 'types'
    },

    amount: {
        type: Number,
        required: true
    },

    prices: {
        type: Number,
        required: true
    },

    color: [],
    size: [],

    infoCode: {
        type: String,
    },
    infoAge: {
        type: String,
    },
    infoWeight: {
        type: String,
    },
    infoMaterial: {
        type: String,
    },
    infoMadeIn: {
        type: String,
    },
    infoDescription: {
        type: String,
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

module.exports = mongoose.model("products", ProductSchema)