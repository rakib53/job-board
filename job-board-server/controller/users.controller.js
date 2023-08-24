const User = require("../model/users.model");
const jwt = require("jsonwebtoken");

//
// Signing JSON web token.
//
const signJsonWebToken = (req, res, next) => {
  const userName = req?.body?.userName;
  const email = req?.body?.email;
  const password = req?.body?.password;
  const IsRemember = req?.body?.IsRemember;

  const user = {
    userName,
    email,
    password,
    IsRemember,
  };

  let isRememberValue;
  if (IsRemember) {
    isRememberValue = "30d";
  }

  const siginInToken = jwt.sign(
    {
      data: user,
    },
    process.env.JWT_SECRET,
    { expiresIn: isRememberValue ? isRememberValue : "1h" }
  );

  if (siginInToken.length > 0) {
    req.token = siginInToken;
    req.userInfo = user;
    next();
  } else {
    res.status(401).json({ message: "Authentication Failed" });
  }
};

//
// Verifing JSON web token.
//
const verifyJsonWebToken = (req, res, next) => {
  try {
    console.log("Verifing user data");
    const userToken = req?.headers?.authorization?.split(" ")[1];
    if (userToken) {
      jwt.verify(userToken, process.env.JWT_SECRET, function (err, decode) {
        if (err) {
          return res.status(401).send({ message: "UnAuthorized access" });
        }
        req.decoded = decode.data;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ message: "Something went wrong, please login again!" });
    }
  } catch (error) {
    next(error);
  }
};

//
// Creating a new User.
//
const registration = async (req, res, next) => {
  try {
    const token = req?.token;
    const { userName, email, password } = req?.userInfo;
    const { accountCompeletation, accountType } = req?.body;
    const date = `${new Date().toDateString().split(" ")[1]} ${
      new Date().toDateString().split(" ")[2]
    } ${new Date().toLocaleString().split(" ")[1].split(":")[0]}:${
      new Date().toLocaleString().split(" ")[1].split(":")[1]
    } ${new Date().toLocaleString().split(" ")[2]}, ${
      new Date().toDateString().split(" ")[3]
    }`;

    // User initial Role for account
    const role = accountType;
    // User info to be send in fronted
    const user = {
      userName,
      password,
      email,
      date,
      role,
      accountCompeletation:
        accountType === "jobSeeker" ? 30 : accountType === "employeer" && 50,
    };

    // User finding from the database
    const isUser = await User.find({ email });
    // Checkng if the user already exist
    if (isUser.length > 0) {
      res.status(301).json({ status: 301, message: "This email alredy exist" });
      return;
    }

    // Creating the user object for database
    const newUser = await new User(user);
    // Saving the user information to database
    const registerdUser = await newUser.save();
    // Removing the password field from the user object before sending the response
    const { password: _, __v: __v, ...userInfo } = registerdUser._doc;

    // Storing the user information to database and gives front end response
    if (registerdUser?._id) {
      res.status(201).json({
        token: token,
        user: userInfo,
        message: "User created successfully",
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    next(error);
  }
};

// Login  User.
const loginUser = async (req, res, next) => {
  try {
    // Token from the JWT
    const token = req?.token;

    // User form information
    const { email, password } = req?.userInfo;

    // Define your search criteria
    const query = { email: email };

    // Checkng if the user already exist
    const isUser = await User.findOne(query);

    // If the user not exist send back to this response to client
    if (!isUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If the user passwod dosent match send back to this response to client
    if (isUser?.password !== password) {
      return res.status(401).json({ error: "Passwod dosen't macth" });
    }

    // Removing the password field from the user object before sending the response
    const { password: _, __v: __v, ...userInfo } = isUser?._doc;

    // If user exist and the password match send this response back to the client
    if (isUser?._id) {
      res.status(201).json({
        token: token,
        user: userInfo,
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Updating the user data
const updateUserData = async (req, res, next) => {
  try {
    // user email
    const { email } = req.decoded;
    // Define your search criteria
    const query = { email: email };

    const {
      userName,
      contactNumber,
      location,
      gender,
      employeeType,
      language,
      interestArea,
      jobTypes,
      jobWhereFrom,
    } = req?.body;

    const updatedData = {};

    if (userName) {
      updatedData.userName = userName;
    }
    if (gender) {
      updatedData.gender = gender;
    }
    if (contactNumber) {
      updatedData.contactNumber = contactNumber;
    }
    if (location) {
      updatedData.location = location;
    }
    if (employeeType) {
      updatedData.employeeType = employeeType;
    }
    if (language?.length > 0) {
      updatedData.language = language;
    }
    if (interestArea?.length > 0) {
      updatedData.interestArea = interestArea;
    }
    if (jobTypes?.length > 0) {
      updatedData.jobTypes = jobTypes;
    }
    if (jobWhereFrom?.length > 0) {
      updatedData.jobWhereFrom = jobWhereFrom;
    }

    if (
      userName &&
      gender &&
      contactNumber &&
      location &&
      employeeType &&
      language?.length > 0
    ) {
      updatedData.accountCompeletation = 70;
    }
    if (
      interestArea?.length > 0 &&
      jobTypes?.length > 0 &&
      jobWhereFrom?.length > 0
    ) {
      updatedData.accountCompeletation = 100;
    }

    // Checkng if the user already exist and updating the data
    const isUser = await User.findOneAndUpdate(query, updatedData, {
      upsert: true,
      new: true,
    });

    // Removing the password field from the user object before sending the response
    const { password: _, __v: __v, ...userInfo } = isUser?._doc;

    // If User exist that means the data has changed
    if (isUser?._id) {
      return res
        .status(201)
        .send({ user: userInfo, message: "Updated your data!" });
    } else {
      return res.status(401).send({ message: "user not valid!" });
    }
  } catch (error) {
    next(error);
  }
};

//
// Checking The user is valid or not
//
const userInfo = async (req, res, next) => {
  try {
    console.log("hittted user info routes");
    // user email
    const { email } = req.decoded;
    // Define your search criteria
    const query = { email: email };
    // Checkng if the user already exist
    const isUser = await User.findOne(query).select("-password");

    if (isUser?._id) {
      return res.status(200).send({
        user: isUser,
        message: "valid user",
      });
    } else {
      return res.status(401).send({ message: "user isn't valid!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signJsonWebToken,
  verifyJsonWebToken,
  registration,
  loginUser,
  updateUserData,
  userInfo,
};
