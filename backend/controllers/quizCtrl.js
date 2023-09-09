

const QuizSet = require('../models/quizSetModel');
const Quiz = require('../models/quizModel');

// Create a new quiz set with multiple quizzes
exports.createQuizSet = async (req, res) => {
    try {
      // Get data from the request body
      const { title,type, description, questions } = req.body;
  
      // Create an array to store the IDs of the created quizzes
      const quizIds = [];
  
      // Create and save individual Quiz documents
      for (const questionData of questions) {
        const { question, answers, correctAnswer } = questionData;
  
        const quiz = new Quiz({
          question,
          answers,
          correct_answer: correctAnswer,
        });
  
        await quiz.save();
  
        // Add the ID of the created quiz to the array
        quizIds.push(quiz._id);
      }
  
      // Create a new quiz set and add the quiz IDs to it
      const quizSet = new QuizSet({
        title,
        type,
        description,
        quizzes: quizIds,
      });
  
      // Save the quiz set to the database
      await quizSet.save();
  
      res.status(201).json({ message: 'Quiz set created successfully', quizSet });
    } catch (error) {
      console.error('Error creating quiz set:', error);
      res.status(500).json({ error: 'An error occurred while creating the quiz set.' });
    }
  };
  exports.findQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;
  
      // Find the question by ID
      const question = await QuizSet.findById(questionId);
  
      if (!question) {
        return res.status(600).json({ error: 'Question not found' });
      }
  
      res.status(200).json({ question });
    } catch (error) {
      console.error('Error finding question by ID:', error);
      res.status(500).json({ error: 'An error occurred while finding the question by ID.' });
    }
  };
  exports.findQuizById = async (req, res) => {
    try {
      const { questionId } = req.params;
  
      // Find the question by ID
      const question = await Quiz.findById(questionId);
  
      if (!question) {
        return res.status(600).json({ error: 'Question not found' });
      }
  
      res.status(200).json({ question });
    } catch (error) {
      console.error('Error finding question by ID:', error);
      res.status(500).json({ error: 'An error occurred while finding the question by ID.' });
    }
  };
  


exports.deleteQuizSet = async (req, res) => {
    try {
      const quizSetId = req.params.quizSetId;
  
      // Find the quiz set by ID
      const quizSet = await QuizSet.findById(quizSetId);
  
      if (!quizSet) {
        return res.status(404).json({ error: 'Quiz set not found' });
      }
  
      // Delete the associated quizzes
      for (const quizId of quizSet.quizzes) {
        await Quiz.findByIdAndRemove(quizId);
      }
  
      // Delete the quiz set itself
      await QuizSet.findByIdAndRemove(quizSetId);
  
      res.json({ message: 'Quiz set and associated quizzes deleted successfully' });
    } catch (error) {
      console.error('Error deleting quiz set:', error);
      res.status(500).json({ error: 'An error occurred while deleting the quiz set.' });
    }
  };

  exports.viewAllQuizzes = async (req, res) => {
    try {
      const quizzes = await QuizSet.find();
      res.status(200).json({ quizzes });
    } catch (error) {
      console.error('Error viewing all quizzes:', error);
      res.status(500).json({ error: 'An error occurred while fetching all quizzes.' });
    }
  };
  
  // Filter quizzes by type
  exports.filterQuizzesByType = async (req, res) => {
    try {
      const { type } = req.params;
  
      const quizzes = await QuizSet.find({ type });
      
      if (!quizzes || quizzes.length === 0) {
        return res.status(404).json({ error: 'No quizzes found for the specified type' });
      }
  
      res.status(200).json({ quizzes });
    } catch (error) {
      console.error('Error filtering quizzes by type:', error);
      res.status(500).json({ error: 'An error occurred while filtering quizzes by type.' });
    }
  };