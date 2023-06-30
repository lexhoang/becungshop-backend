const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },

    code: {
        type: String,
        required: true
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
        type: String,
        required: true
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
        type: String,
        required: true
    },
    infoMaxAge: {
        type: String,
        required: true
    },
    infoMinWeight: {
        type: String,
        required: true
    },
    infoMaxWeight: {
        type: String,
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