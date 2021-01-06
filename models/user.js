const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'full name is required.'],
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
  },
  roles: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Role' }],
  reg_date: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' });

const User = module.exports = mongoose.model('User', UserSchema);
