const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  role: { type: String, default: 'USER' },
  profile_picture: { type: String, required: false, default: null },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  otp: { type: String, required: false },  // Trường này đã được khai báo đúng
  otpExpiration: { type: Date, required: false },  // Trường này cũng đã được khai báo đúng
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);

