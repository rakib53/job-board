const {
  registration,
  loginUser,
  signJsonWebToken,
  verifyJsonWebToken,
  userInfo,
  updateUserData,
} = require("../controller/users.controller");
const router = require("express").Router();

router.post("/registration", signJsonWebToken, registration);
router.post("/login", signJsonWebToken, loginUser);
router.get("/userInfo", verifyJsonWebToken, userInfo);
router.put("/updateUserData", verifyJsonWebToken, updateUserData);
module.exports = router;
