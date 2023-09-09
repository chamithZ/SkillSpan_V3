const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  roadMap: {
    type: Schema.Types.ObjectId,
    ref: "RoadMap", // Reference to the Company model
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
  difficultyLevel: {
    type: String,
  },
  skillsRequired: {
    type: [String],
  },
  resources: {
    type: [String],
  },
  attachments: {
    type: [String],
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
