const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roadMapSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company", // Reference to the Company model
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  skillsCovered: {
    type: [String],
  },
  prerequisites: {
    type: [String],
  },
  goalsObjectives: {
    type: String,
  },
  progressTracking: {
    type: Boolean,
    default: false, // Default to false if not specified
  },
  additionalNotes: {
    type: String,
  },
  enrolled : {
    type : Boolean,
    default : false 
  }
});

module.exports = mongoose.model("RoadMap",roadMapSchema)
