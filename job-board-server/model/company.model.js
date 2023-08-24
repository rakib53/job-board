const mongoose = require("mongoose");

const Companies = mongoose.Schema({
  companyName: String,
  companyLogo: String,
  companyWebUrl: String,
  companyDescription: String,
  employees: Number,
  companyType: String,
  joinDate: String,
  opportunitiesPosted: Number,
  hired: Number,
  companyLocation: String,
  hiringManagerUserId: String,
});

module.exports = mongoose.model("Companies", Companies);
