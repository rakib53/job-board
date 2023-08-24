const mongoose = require("mongoose");

const User = mongoose.Schema({
  userName: String,
  phone: String,
  email: String,
  password: String,
  date: String,
  role: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  avatar: String,
  gender: String,
  contactNumber: String,
  location: String,
  employeeType: String,
  language: Array,
  accountCompeletation: Number,
  interestArea: Array,
  jobTypes: Array,
  jobWhereFrom: Array,
  companyId: String,
});

module.exports = mongoose.model("User", User);
