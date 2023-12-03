const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  Name: {
    type: String,
  },
  Address: {
    type: String,
  },
  companyRegID: {
    type: String,
  },
  industry: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  companyDetails : {
    type : String,
  },
  dp: {
    type: String, // Store the path/reference to the image
  },
  userId :{
    type:String
  }
}); 

module.exports = mongoose.model("Company", companySchema);