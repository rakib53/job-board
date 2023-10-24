const mongoose = require("mongoose");

const saveJob = mongoose.Schema({
  userId: {
    type: String,
  },
  jobId: {
    type: String,
    ref: "Jobs",
  },
  company: {
    type: String,
  },
});

module.exports = mongoose.model("saveJob", saveJob);
