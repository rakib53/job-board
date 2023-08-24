const jobApplication = require("../model/jobApplication.model");

// Creating a new Job Applcation (Student Route)
const postJobApplication = async (req, res, next) => {
  try {
    const { userId, jobId, companyId, coverLetter, jobTerms } = req?.body;

    const upcomingJobApplication = {
      userId,
      jobId,
      companyId,
      coverLetter,
      jobTerms,
    };

    if (jobId) {
      // User finding from the database
      const isJob = await jobApplication.findOne({ userId, jobId });
      // Saving and post a job application
      if (!isJob?._id) {
        const newJobApplication = await new jobApplication(
          upcomingJobApplication
        );
        const newSavedJobApplciation = await newJobApplication.save();
        if (newSavedJobApplciation?._id) {
          res
            .status(201)
            .json({ status: 201, message: "Successfully applied" });
        } else {
          res.status(301).json({
            status: 301,
            message: "something went wrong, please try again later!",
          });
        }
      } else {
        res
          .status(301)
          .json({ status: 301, message: "Application already submitted!" });
      }
    } else {
      res.status(301).json({ status: 301, message: "Job not found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Getting all the application for a single user (Student Route)
const getUserApplicaions = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    if (userId) {
      const query = { userId: userId };
      // User finding from the database
      const myApplicaitons = await jobApplication
        .find(query)
        .populate("companyId")
        .populate("jobId");
      // Saving and post a job application
      if (myApplicaitons) {
        res.status(201).json({
          status: 201,
          myApplicaitons,
        });
      }
    }

    return;
  } catch (error) {
    next(error);
  }
};

// get an application details (student route)
const getApplication = async (req, res, next) => {
  try {
    const { applicationId } = req?.params;

    const applicationDetails = await jobApplication
      .findOne({
        _id: applicationId,
      })
      .populate("jobId")
      .populate("companyId");
    if (applicationDetails?._id) {
      res.status(201).json({
        status: 201,
        applicationDetails: applicationDetails,
      });
    } else {
      res.status(201).json({
        status: 201,
        error: "something went wrong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get all the applicants (Employeer Route)
const getApplicants = async (req, res, next) => {
  try {
    const { jobId } = req?.params;

    console.log(jobId);

    if (jobId) {
      const query = { jobId: jobId };

      const jobPerApplicants = await jobApplication
        .find(query)
        .populate("userId")
        .populate("jobId");

      res.status(201).json({
        status: 201,
        applicants: jobPerApplicants,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postJobApplication,
  getUserApplicaions,
  getApplication,
  getApplicants,
};
