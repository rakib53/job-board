const {
  postJobApplication,
  getUserApplicaions,
  getApplicants,
  getApplication,
  getAllJobsApplication,
  viewedJobApplication,
  getAllApplications,
} = require("../controller/jobApplication.controller");
const { verifyJsonWebToken } = require("../controller/users.controller");
const router = require("express").Router();

router.get(
  "/getJobApplications/:userId",
  verifyJsonWebToken,
  getUserApplicaions
);
router.get(
  "/getApplication/:applicationId",
  verifyJsonWebToken,
  getApplication
);
router.get(
  "/getAllJobsApplication/:companyId",
  verifyJsonWebToken,
  getAllJobsApplication
);
router.patch(
  "/viewedJobApplication/:applicationId",
  verifyJsonWebToken,
  viewedJobApplication
);
router.get(
  "/getAllApplications/:companyId",
  verifyJsonWebToken,
  getAllApplications
);
router.get("/getApplicants/:jobId", verifyJsonWebToken, getApplicants);
router.post("/postJobApplication", verifyJsonWebToken, postJobApplication);

module.exports = router;
