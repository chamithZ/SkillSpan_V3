const router = require("express").Router();
const companyCtrl = require("../controllers/companyCtrl.js")

router.route("/company/add").post(companyCtrl.addCompany);      // add companies
router.route("/company/getAll").get(companyCtrl.getAllCompanies)
router.route("/company/getSingle/:id").get(companyCtrl.getOneCompany) 
router.route("/company/delete/:id").delete(companyCtrl.deleteCompany)
router.route("/company/update/:id").put(companyCtrl.updateCompany)
router.route("/company/getRoadmaps/:id").get(companyCtrl.getRoadMapsByCompanyID) 




module.exports = router;    