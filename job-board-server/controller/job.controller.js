const { User, Employer } = require("../model/users.model");
const Jobs = require("../model/job.model");
const saveJob = require("../model/savedJob.model");

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
// making custom JobID
const JobId = (jobTitle) => {
  const underscoreJobTitle = jobTitle.split(" ").join("-");
  return `${underscoreJobTitle}-${Date.now()}`;
};
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

// create Job Post (Empoloyeer Route).
const createJob = async (req, res, next) => {
  try {
    const {
      userId,
      companyId,
      probation,
      jobTitle,
      experience,
      salary,
      joinDate,
      applyEndDate,
      jobType,
      workLocation,
      numberOfOpen,
      description,
    } = req?.body;

    if (
      companyId &&
      jobTitle &&
      experience &&
      salary &&
      joinDate &&
      applyEndDate &&
      jobType &&
      workLocation &&
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
        workLocation,
        numberOfOpen: parseInt(numberOfOpen),
        description,
        probation: probationCustomize(probation),
        salary,
        timeStamp: Date.now(),
      };

      if (salary?.salaryRange?.from && salary?.salaryRange?.to) {
        newJobObj.salary = {
          salaryRange: {
            from: parseInt(salary?.salaryRange?.from),
            to: parseInt(salary?.salaryRange?.to),
          },
        };
      } else if (salary?.salaryRange?.from && !salary?.salaryRange?.to) {
        newJobObj.salary = {
          salaryRange: {
            from: parseInt(salary?.salaryRange?.from),
          },
        };
      }

      const query = { _id: userId };
      // Checkng if the user exist
      const isUser = await User.findOne(query);

      // Checking if the user Id and the company ID is same
      if (isUser?._id.toString() === userId) {
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

// edit Job Post (Empoloyeer Route).
const editJob = async (req, res, next) => {
  try {
    const { jobId } = req?.params;
    const {
      companyId,
      probation,
      jobTitle,
      experience,
      salary,
      joinDate,
      applyEndDate,
      jobType,
      workLocation,
      numberOfOpen,
      description,
    } = req?.body;

    if (
      companyId &&
      jobTitle &&
      experience &&
      salary &&
      joinDate &&
      applyEndDate &&
      jobType &&
      workLocation &&
      numberOfOpen &&
      description
    ) {
      const updatedJob = {
        jobId: jobId,
        company: companyId,
        jobTitle,
        experience,
        joinDate,
        applyEndDate,
        jobType,
        workLocation,
        numberOfOpen: parseInt(numberOfOpen),
        description,
        probation: probationCustomize(probation),
        salary,
      };

      if (salary?.salaryRange?.from && salary?.salaryRange?.to) {
        updatedJob.salary = {
          salaryRange: {
            from: parseInt(salary?.salaryRange?.from),
            to: parseInt(salary?.salaryRange?.to),
          },
        };
      } else if (salary?.salaryRange?.from && !salary?.salaryRange?.to) {
        updatedJob.salary = {
          salaryRange: {
            from: parseInt(salary?.salaryRange?.from),
          },
        };
      }
      const query = { jobId: jobId };
      // Checkng if the user exist
      const isUser = await Jobs.findOneAndUpdate(query, updatedJob);

      // Checking if the user Id and the company ID is same
      if (isUser?._id) {
        return res
          .status(200)
          .json({ job: isUser, message: "Job updated successfully!" });
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
  try {
    const page = parseInt(req.query.page) || 1; // page number query
    const perPage = 8; // showing per page job
    const titleQuery = req.query?.jobTitle || ""; // job title query
    const jobType = req?.query?.jobType; // in House job query;
    const workLocation = req?.query?.workLocation; // work location job query;
    const experienceQuery = req.query?.experience; // experience query
    const salaryMin = parseInt(req.query?.salaryMin); // Minimum salary query
    const salaryMax = parseInt(req.query?.salaryMax); // Maximum salary query
    const locationQuery = req?.query?.location || ""; // location query

    // Create regular expressions for jobTitle and jobType
    const jobTitleRegex = new RegExp(titleQuery, "i");
    const filter = {};
    // Add filters to the filter object if provided in the query parameters
    if (titleQuery) filter.jobTitle = jobTitleRegex;

    if (jobType === "partTime") {
      filter.jobType = "partTime";
    }
    if (jobType === "fullTime") {
      filter.jobType = "fullTime";
    }
    if (workLocation === "Remote") {
      filter.workLocation = "Remote";
    }
    if (workLocation === "InHouse") {
      filter.workLocation = "InHouse";
    }

    if (salaryMin && salaryMax) {
      filter["salary.salaryRange.from"] = { $gte: salaryMin || 0 };
      filter["salary.salaryRange.to"] = {
        $lte: salaryMax || Number.MAX_SAFE_INTEGER,
      };
    } else if (salaryMin && !salaryMax) {
      filter["salary.salaryRange.from"] = { $gte: salaryMin || 0 };
    } else if (salaryMax && !salaryMin) {
      filter["salary.salaryRange.to"] = {
        $lte: salaryMax || Number.MAX_SAFE_INTEGER,
      };
    }
    // Create filter conditions for experience range
    if (experienceQuery) {
      const experienceValue = parseInt(experienceQuery);

      if (experienceValue === 0) {
        filter["experience.experienceRange.to"] = {
          $lte: 2,
        };
      } else if (experienceValue > 5) {
        filter["experience.experienceRange.to"] = {
          $gte: 6,
        };
      } else {
        filter["experience.experienceRange.from"] = {
          $lte: experienceValue,
        };
        filter["experience.experienceRange.to"] = {
          $gte: experienceValue,
        };
      }
    }

    if (locationQuery) {
    }

    // Count the number of documents that match the filter
    const totalPosts = await Jobs.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    const jobs = await Jobs.find(filter)
      .populate("company")
      .skip((page - 1) * perPage)
      .limit(perPage);

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalJob: totalPosts,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      jobs: jobs,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
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
        await Jobs.findOneAndUpdate(query, {
          $set: { jobViews: jobDetails?.jobViews + 1 },
        });
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
    return res.status(200).json({ userId: isSavedJob?.userId });
  } catch (error) {
    next(error);
  }
};

// get The saved job
const getSavedJobs = async (req, res, next) => {
  try {
    const { userId } = req?.params;
    if (userId) {
      const savedJobsWithJobDetails = await saveJob.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $addFields: {
            jobIdToLookup: { $toObjectId: "$jobId" },
          },
        },
        {
          $lookup: {
            from: "jobs",
            localField: "jobIdToLookup",
            foreignField: "_id",
            as: "jobDetails",
          },
        },
        {
          $unwind: "$jobDetails",
        },
        {
          $addFields: {
            companyIdToLookup: { $toObjectId: "$jobDetails.company" },
          },
        },
        {
          $lookup: {
            from: "companies",
            localField: "companyIdToLookup",
            foreignField: "_id",
            as: "jobDetails.company",
          },
        },
        {
          $unwind: "$jobDetails.company",
        },
        {
          $project: {
            jobIdToLookup: 0,
            companyIdToLookup: 0,
          },
        },
      ]);

      res.status(200).json({ jobs: savedJobsWithJobDetails });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  editJob,
  getJobs,
  getEmployeerJobList,
  getJobDetails,
  deleteJob,
  postSavedJob,
  getSavedJob,
  getSavedJobs,
};
