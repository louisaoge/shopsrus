const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    customer: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

    reg_date: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number
    }
}, {
    collection: 'orders'
});

const Order = module.exports = mongoose.model('Order', OrderSchema);