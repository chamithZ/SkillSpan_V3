const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    },
    {
      type: String,
      required: true,
    },
  ],
  correct_answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);
