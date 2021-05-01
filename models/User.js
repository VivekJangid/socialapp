const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gst_no: { type: Number, required: true },  
  address: { type: String, required: true }, 
  city : {type:String, required:true},
  email = {type: String, required: true},
  phone = {type: Number, required: true}, 
  pincode = {type: Number, required: true},
  user_type = {type: String, required: true},   // Employee , Buyer , Seller
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, required: false },
});

module.exports = User = mongoose.model('user', UserSchema);
