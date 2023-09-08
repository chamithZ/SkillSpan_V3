const mongoose = require("mongoose");

const MONGO_URL='mongodb+srv://skillSpanAdmin:16820@cluster0.dxw50go.mongodb.net/SkillSpanDB?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected : ${conn.connection.host} 😎`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
