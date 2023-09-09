const mongoose = require('mongoose');

const QuizSetSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    type:{
        type:String,
        required:true
    },
    description: {
      type: String,
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
      },
    ],
  }, { timestamps: true });
  
  module.exports = mongoose.model("QuizSet", QuizSetSchema);