const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
  accountCompeletation: Number,
});

const jobSeekerSchema = new mongoose.Schema({
  employeeType: String,
  language: { type: [String], sparse: true },
  interestArea: { type: [String], sparse: true },
  jobTypes: { type: [String], sparse: true },
  jobWhereFrom: { type: [String], sparse: true },
  resume: {
    education: [
      {
        title: String,
        degree: String,
        datesAttended: Object,
        subject: String,
        description: String,
      },
    ],
    job: [
      {
        title: String,
        organization: String,
        location: String,
        isRemote: Boolean,
        datesAttended: Object,
        description: String,
      },
    ],
    traningCourse: [
      {
        title: String,
        organization: String,
        location: String,
        datesAttended: Object,
        description: String,
      },
    ],
    personalProject: [
      {
        title: String,
        projectLink: String,
        datesAttended: Object,
        description: String,
      },
    ],
    skill: [{ title: String, level: String }],
    socialLinks: {
      blogLink: String,
      githubLink: String,
      playStore: String,
      behanceLink: String,
      otherLink: String,
    },
    additionalDetails: [
      {
        additionalDetails: String,
      },
    ],
  },
});

const employerSchema = new mongoose.Schema({
  companyId: String,
});

const User = mongoose.model("User", UserSchema);

const JobSeeker = User.discriminator("jobSeeker", jobSeekerSchema);
const Employer = User.discriminator("employeer", employerSchema);

module.exports = { User, JobSeeker, Employer };
