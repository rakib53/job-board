const {
  registration,
  loginUser,
  signJsonWebToken,
  verifyJsonWebToken,
  userInfo,
  updateUserData,
  updateJobSekeerResume,
  deleteJobSekeerResumeInfo,
  editResumeInfo,
} = require("../controller/users.controller");
const router = require("express").Router();

router.post("/registration", signJsonWebToken, registration);
router.post("/login", signJsonWebToken, loginUser);
router.get("/userInfo", verifyJsonWebToken, userInfo);
router.put("/updateUserData", verifyJsonWebToken, updateUserData);
router.put("/updateJobSekeerResume", verifyJsonWebToken, updateJobSekeerResume);
router.put("/editResumeInfo", verifyJsonWebToken, editResumeInfo);
router.delete(
  "/deleteJobSekeerResumeInfo",
  verifyJsonWebToken,
  deleteJobSekeerResumeInfo
);
module.exports = router;
