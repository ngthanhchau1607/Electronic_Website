const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  google_id: { type: String, default: null },
  phone_number: { type: String, required: false },
  role: { type: String, default: 'USER' },
  full_name: { type: String, required: true },
  profile_picture: { type: String, default: null },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema, 'user');