const {
  addCompany,
  getCompanyInformation,
} = require("../controller/company.controller");
const { verifyJsonWebToken } = require("../controller/users.controller");
const router = require("express").Router();

router.post("/addCompany", verifyJsonWebToken, addCompany);
router.get("/getCompanyInformation/:companyId", getCompanyInformation);
module.exports = router;
