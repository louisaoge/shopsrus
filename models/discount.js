const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const DiscountSchema = new mongoose.Schema({
    discount_type: {
    type: String,
    required: [true, 'discount_type is required.'],
  },
  discount_rate: {
    type: Number,
    required: [true, 'discount_rate is required.'],
  },
}, { collection: 'discounts' });

const Discount = module.exports = mongoose.model('Discount', DiscountSchema);
