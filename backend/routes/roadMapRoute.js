const router = require("express").Router();
const roadmapCtrl = require("../controllers/roadMapCtrl");

router.route("/roadMap/add").post(roadmapCtrl.addRoadmap);         // Add roadmaps
router.route("/roadMap/getAll").get(roadmapCtrl.getAllRoadmaps);   // Get all roadmaps
router.route("/roadMap/getSingle/:id").get(roadmapCtrl.getOneRoadmap); // Get a single roadmap by ID
router.route("/roadMap/delete/:id").delete(roadmapCtrl.deleteRoadmap); // Delete a roadmap by ID
router.route("/roadMap/update/:id").put(roadmapCtrl.updateRoadmap);   // Update a roadmap by ID
router.route("/roadMap/addAssignment/:id").post(roadmapCtrl.addAssignmentToRoadmap);

module.exports = router;
