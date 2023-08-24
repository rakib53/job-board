const User = require("../model/users.model");
const Jobs = require("../model/job.model");
const saveJob = require("../model/savedJob.model");
const mongoose = require("mongoose");

// Formating the salary
function formatUSD(number, digits) {
  // Convert the number to a string
  const numStr = number.toString();

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split(".");

  // Format the integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part and decimal part (if any)
  let formattedNumber = formattedIntegerPart;
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}

// Customize the salay in visulization
const CustomizeSalary = (currenciesType, salary) => {
  let currencySymbol = null;

  if (currenciesType === "USD") {
    currencySymbol = "$";
  } else if (currenciesType === "EURO") {
    currencySymbol = "€";
  } else if (currenciesType === "BDT") {
    currencySymbol = "৳";
  } else if (currenciesType === "INR") {
    currencySymbol = "₹";
  }

  return currencySymbol + " " + formatUSD(salary);
};
// Customize the probation in visulization
const probationCustomize = (probation) => {
  const probationObj = {};
  const probationNum = parseInt(probation.probationPeriodNumber);
  const time = probation.probationPeriodTime.toLowerCase();
  const temp = probationNum > 1 ? `${time}s` : `${time}`;

  if (probation.probation) {
    probationObj.probation = true;
    probationObj.probationDuringSalary = CustomizeSalary(
      probation.probationCurrencyType,
      probation.probationDuringSalary
    );
    probationObj.probationPeriodTime = probationNum + " " + temp;
  }
  return probationObj;
};
// Customizint the job title
const JobId = (jobTitle) => {
  const trimedJobTitle = jobTitle.trim();
  const jobTitleAsURL = trimedJobTitle.split(" ").join("-");
  console.log(jobTitleAsURL);
  return jobTitleAsURL + "-" + Date.now();
};

// create Job Post (Empoloyeer Route).
const createJob = async (req, res, next) => {
  try {
    console.log("Hitting The Create job post route!");
    const {
      userId,
      companyId,
      companyName,
      companyLocation,
      probation,
      jobTitle,
      experience,
      salary,
      joinDate,
      applyEndDate,
      jobType,
      numberOfOpen,
      description,
    } = req?.body;

    if (
      companyId &&
      companyName &&
      companyLocation &&
      jobTitle &&
      experience &&
      salary &&
      joinDate &&
      applyEndDate &&
      jobType &&
      numberOfOpen &&
      description
    ) {
      const newJobObj = {
        jobId: JobId(jobTitle),
        company: companyId,
        jobTitle,
        experience,
        joinDate,
        applyEndDate,
        jobType,
        numberOfOpen,
        description,
        probation: probationCustomize(probation),
        salary,
        timeStamp: Date.now(),
      };

      const query = { _id: userId };
      // Checkng if the user exist
      const isUser = await User.findOne(query);
      // Checking if the user Id and the company ID is same

      if (
        isUser?._id.toString() === userId &&
        isUser?.companyId === companyId
      ) {
        const createdNewJob = await new Jobs(newJobObj);
        const newJobPosted = await createdNewJob.save();
        if (newJobPosted?._id) {
          return res
            .status(200)
            .json({ job: newJobPosted, message: "Job added successfully!" });
        }
      }
    } else {
      return res.status(401).json({ error: "Somethings went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

// delete a job
const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req?.params;
    if (jobId) {
      const isJob = await Jobs.findOneAndDelete({ jobId });
      if (isJob?._id) {
        return res.status(200).json({ message: "Job Deleted successfully!" });
      }
    }
  } catch (error) {
    next(error);
  }
};

// Get all the jobs
const getJobs = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  try {
    const totalPosts = await Jobs.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    const allJobs = await Jobs.find()
      .populate("company")
      .skip((page - 1) * perPage)
      .limit(perPage);

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalJob: totalPosts,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      jobs: allJobs,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get Job details
const getJobDetails = async (req, res, next) => {
  try {
    const { jobId } = req?.params;
    if (jobId) {
      const query = { jobId: jobId };
      const jobDetails = await Jobs.findOne(query).populate("company");
      if (jobDetails?._id) {
        res.status(200).json({ jobDetails });
      }
    }
  } catch (error) {
    next(error);
  }
};

// Get all the Employeer job list
const getEmployeerJobList = async (req, res, next) => {
  try {
    // Company Id from params
    const { companyId } = req?.params;
    // If company ID have
    if (companyId) {
      // query from the database
      const query = { company: companyId };
      // Find all the Job related to your company ID
      const allJobs = await Jobs.find(query).populate("company");

      if (allJobs) {
        return res.status(200).json({ jobs: allJobs });
      }
    } else {
      return res.status(400).json({ error: "Something went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

// post user saved job (student route)
const postSavedJob = async (req, res, next) => {
  try {
    const { userId, jobId, companyId } = req?.body;
    // Job finding from the database
    const isJob = await Jobs.findOne({ _id: jobId });
    // Saving and post a job application
    if (isJob?._id) {
      // User finding from the database
      const isSavedJob = await saveJob.findOne({ jobId: jobId });
      if (!isSavedJob) {
        const newSavedJob = await new saveJob({
          userId,
          jobId,
          companyId,
        });
        await newSavedJob.save();
        res
          .status(201)
          .json({ status: 201, message: "Successfully saved job!" });
      } else {
        // If the saved job already found then delete it
        const isSavedJob = await saveJob.findOneAndDelete({ jobId: jobId });
        res.status(201).json({ status: 201, message: "Removed saved job" });
      }
    }
  } catch (error) {
    next(error);
  }
};

// get The saved job
const getSavedJob = async (req, res, next) => {
  try {
    const { userId, jobId } = req?.params;
    const isSavedJob = await saveJob.findOne({ userId: userId, jobId: jobId });
    if (isSavedJob?._id) {
      res.status(200).json({ userId: userId });
    } else {
      res.status(500);
    }
  } catch (error) {
    next(error);
  }
};

// get The saved job
const getSavedJobs = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    if (userId) {
      // const isSavedJob = await saveJob
      //   .find({ userId })
      //   .populate("jobId")
      //   .populate("company")
      // if (savedJobsWithCompanyDetails) {
      //   res.status(200).json({ jobs: savedJobsWithCompanyDetails });
      // }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getJobs,
  getEmployeerJobList,
  getJobDetails,
  deleteJob,
  postSavedJob,
  getSavedJob,
  getSavedJobs,
};
