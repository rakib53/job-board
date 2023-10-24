const { User, Employer } = require("../model/users.model");
const CompanyModel = require("../model/company.model");

// Login  User.
const addCompany = async (req, res, next) => {
  try {
    const {
      userId,
      companyName,
      companyLogo,
      companyWebUrl,
      companyDescription,
      employees,
      companyType,
      companyLocation,
    } = req?.body;
    if (userId) {
      const query = { _id: userId };
      // Checkng if the user exist
      const isUser = await User.findOne(query);
      // Company Info from user
      const company = {
        companyName,
        companyLogo,
        companyWebUrl,
        companyDescription,
        employees,
        companyType,
        companyLocation,
        hiringManagerUserId: isUser?._id,
      };
      if (isUser?._id && !isUser?.companyId) {
        // Creating the company info in database
        const newCompany = await new CompanyModel(company);
        // Saving the company information to database
        const savedCompany = await newCompany.save();

        if (savedCompany?._id) {
          const updatedUserCompanyId = await Employer.updateOne(
            { _id: userId },
            { companyId: savedCompany?._id, accountCompeletation: 100 },
            {
              upsert: true,
              new: true,
            }
          );
          if (updatedUserCompanyId?.acknowledged) {
            return res.status(201).json({
              companyInfo: savedCompany,
              message: "Company Added Successfully!",
            });
          }
        }
      } else {
        return res.status(401).json({ error: "Somethings went wrong!" });
      }
    } else {
      return res.status(401).json({ error: "Somethings went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

// Get all the Employeer job list
const getCompanyInformation = async (req, res, next) => {
  try {
    // Company Id from params
    const { companyId } = req?.params;
    // If company ID have
    if (companyId) {
      // Query from the database
      const query = { _id: companyId };
      // Find all the Job related to your company ID
      const companyInfo = await CompanyModel.findOne(query);
      if (companyInfo?._id && companyId) {
        return res.status(200).json({
          companyInfo,
        });
      }
    } else {
      return res.status(400).json({ error: "Something went wrong!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCompany,
  getCompanyInformation,
};
