// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Company', 'Student'], default: 'Student' },
  email : {type:String},
  contactNumber : {type:String},
  campus : {type:String},
  age : {type:String}
});

module.exports = mongoose.model('User', userSchema);
