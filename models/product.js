const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number
    }
}, {
    collection: 'products'
});

const Product = module.exports = mongoose.model('Product', ProductSchema);