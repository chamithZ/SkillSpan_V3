const Roadmap = require('../models/RoadMap');
const Assignment = require("../models/Assignment");


// Add a new roadmap
const addRoadmap = async (req, res) => {
  try {
    const newRoadmap = new Roadmap({
      ...req.body,
    });

    const savedRoadmap = await newRoadmap.save();
    res.json(savedRoadmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all roadmaps
const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one roadmap by ID
const getOneRoadmap = async (req, res) => {
  try {
    const id = req.params.id;
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a roadmap by ID
const deleteRoadmap = async (req, res) => {
  try {
    const id = req.params.id;
    await Roadmap.findByIdAndDelete(id);
    res.json('Deleted roadmap');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a roadmap by ID
const updateRoadmap = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRoadmap = {
      ...req.body,
    };

    await Roadmap.findByIdAndUpdate(id, updatedRoadmap);
    res.json(updatedRoadmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add an assignment to a roadmap
const addAssignmentToRoadmap = async (req, res) => {
  try {
    const roadmapId = req.params.roadmapId; // Get the roadmap ID from the request params
    const assignmentData = req.body; // The assignment data to be added

    // Find the roadmap by ID
    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found" });
    }

    // Create a new Assignment document
    const newAssignment = new Assignment(assignmentData);

    // Push the new assignment to the roadmap's assignments array
    roadmap.assignments.push(newAssignment);

    // Save the updated roadmap
    await roadmap.save();

    res.json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addRoadmap,
  getAllRoadmaps,
  getOneRoadmap,
  deleteRoadmap,
  updateRoadmap,
  addAssignmentToRoadmap
};
