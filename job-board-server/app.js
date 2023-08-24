const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/user.router");
const CompanyRouter = require("./routes/company.router");
const JobRouter = require("./routes/job.router");
const jobApplication = require("./routes/jobApplication.router");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// User API
app.use("/api", UserRouter);
// Company API
app.use("/api", CompanyRouter);
// Company API
app.use("/api", JobRouter);
// Job application
app.use("/api", jobApplication);

// Error Handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ message: "Something went wrong!!" });
  }
  console.log(err);
});

module.exports = app;
