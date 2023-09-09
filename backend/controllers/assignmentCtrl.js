const Assignment = require("../models/Assignment");

// Add a new assignment
const addAssignment = async (req, res) => {
  try {
    const newAssignment = new Assignment({
      ...req.body,
    });

    const savedAssignment = await newAssignment.save();
    res.json(savedAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one assignment by ID
const getOneAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an assignment by ID
const deleteAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    await Assignment.findByIdAndDelete(id);
    res.json('Deleted assignment');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an assignment by ID
const updateAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAssignment = {
      ...req.body,
    };

    await Assignment.findByIdAndUpdate(id, updatedAssignment);
    res.json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAssignmentsByRoadmapID = async (req, res) => {
    const roadmapID = req.params.id; // Get the roadmap ID from params
  
    try {
      const assignments = await Assignment.find({ roadMap: roadmapID }).exec();
  
      if (!assignments) {
        return res.status(404).json({ message: 'Assignments not found for the provided roadmap ID.' });
      }
  
      return res.status(200).json(assignments);
    } catch (error) {
      console.error('Error fetching assignments by roadmap ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
  addAssignment,
  getAllAssignments,
  getOneAssignment,
  deleteAssignment,
  updateAssignment,
  getAssignmentsByRoadmapID,
};
