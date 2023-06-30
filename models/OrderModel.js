const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    account: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    orderDetail: [],
    bill: {
        type: Number,
        required: true
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

module.exports = mongoose.model('orders', OrderSchema);