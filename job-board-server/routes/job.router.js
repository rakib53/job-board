const {
  createJob,
  getJobs,
  getEmployeerJobList,
  getJobDetails,
  deleteJob,
  postSavedJob,
  getSavedJob,
  getSavedJobs,
  editJob,
} = require("../controller/job.controller");
const { verifyJsonWebToken } = require("../controller/users.controller");
const router = require("express").Router();

router.get("/getJobs", getJobs);
router.get("/getJobs/:jobId", getJobDetails);
router.get("/getSavedJob/:userId/:jobId", verifyJsonWebToken, getSavedJob);
router.get("/getSavedJobs/:userId", verifyJsonWebToken, getSavedJobs);
router.post("/createJob", verifyJsonWebToken, createJob);
router.put("/editJob/:jobId", verifyJsonWebToken, editJob);
router.post("/postSavedJob", verifyJsonWebToken, postSavedJob);
router.get(
  "/getEmployeerJobList/:companyId",
  verifyJsonWebToken,
  getEmployeerJobList
);
// Deleting a job
router.delete("/jobs/:jobId", verifyJsonWebToken, deleteJob);
module.exports = router;
