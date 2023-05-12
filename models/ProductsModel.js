const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },

    photoUrl: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    productFor: {
        type: mongoose.Types.ObjectId,
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
        required: true
    },
    infoMinAge: {
        type: Number,
        required: true
    },
    infoMaxAge: {
        type: Number,
        required: true
    },
    infoMinWeight: {
        type: Number,
        required: true
    },
    infoMaxWeight: {
        type: Number,
        required: true
    },
    infoMaterial: {
        type: String,
        required: true
    },
    infoMadeIn: {
        type: String,
        required: true
    },
    description: {
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