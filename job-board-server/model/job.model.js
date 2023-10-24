const mongoose = require("mongoose");

const Jobs = mongoose.Schema({
  jobId: String,
  jobTitle: String,
  experience: { experienceRange: { from: Number, to: Number } },
  joinDate: String,
  applyEndDate: String,
  jobType: String,
  workLocation: String,
  probation: {
    probation: Boolean,
    probationDuringSalary: String,
    probationPeriodTime: String,
  },
  salary: {
    salaryRange: { from: Number, to: Number },
  },
  numberOfOpen: Number,
  description: String,
  company: {
    type: String,
    ref: "Companies",
  },
  timeStamp: Number,
  applicants: Number,
  jobViews: Number,
});

module.exports = mongoose.model("Jobs", Jobs);

// {mongoose.Schema.Types.ObjectId}
