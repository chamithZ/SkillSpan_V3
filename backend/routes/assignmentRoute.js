const router = require("express").Router();
const assignmentCtrl = require("../controllers/assignmentCtrl.js");

router.route("/assignment/add").post(assignmentCtrl.addAssignment);           // Add assignments
router.route("/assignment/getAll").get(assignmentCtrl.getAllAssignments);    // Get all assignments
router.route("/assignment/getSingle/:id").get(assignmentCtrl.getOneAssignment); // Get a single assignment by ID
router.route("/assignment/delete/:id").delete(assignmentCtrl.deleteAssignment); // Delete an assignment by ID
router.route("/assignment/update/:id").put(assignmentCtrl.updateAssignment);   // Update an assignment by ID
router.route("/assignment/getSingleByRoadMap/:id").get(assignmentCtrl.getAssignmentsByRoadmapID)

module.exports = router;
