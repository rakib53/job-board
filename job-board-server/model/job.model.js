const mongoose = require("mongoose");

const Jobs = mongoose.Schema({
  jobId: String,
  jobTitle: String,
  experience: String,
  joinDate: String,
  applyEndDate: String,
  jobType: String,
  probation: {
    probation: Boolean,
    probationDuringSalary: String,
    probationPeriodTime: String,
  },
  salary: {
    salaryFrequency: String,
    salaryRange: { from: String, to: String },
    selectedCurrency: String,
  },
  numberOfOpen: Number,
  description: String,
  company: {
    type: String,
    ref: "Companies",
  },
  timeStamp: Number,
});

module.exports = mongoose.model("Jobs", Jobs);

// {mongoose.Schema.Types.ObjectId}
