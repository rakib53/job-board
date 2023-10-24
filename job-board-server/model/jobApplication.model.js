const mongoose = require("mongoose");

const jobApplication = mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  jobId: {
    type: String,
    ref: "Jobs",
  },
  companyId: {
    type: String,
    ref: "Companies",
  },
  coverLetter: String,
  jobTerms: String,
  viewApplication: Boolean,
  timeStamp: Number,
});

module.exports = mongoose.model("jobApplication", jobApplication);
