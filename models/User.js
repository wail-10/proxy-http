const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  geo: {
    lat: String,
    lng: String,
  },
});

const companySchema = new mongoose.Schema({
  name: String,
  catchPhrase: String,
  bs: String,
});

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  address: addressSchema,
  company: companySchema,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
