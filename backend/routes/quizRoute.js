// routes.js

const express = require('express');
const router = express.Router();
const quizSetController = require('../controllers/quizCtrl');

// Create a new quiz set with multiple quizzes
router.post('/quizsets', quizSetController.createQuizSet);
router.delete('/quizsets/:quizSetId', quizSetController.deleteQuizSet);
// View all quizzes
router.get('/quizzes', quizSetController.viewAllQuizzes);

// Filter quizzes by type
router.get('/quizzes/:type', quizSetController.filterQuizzesByType);

router.get('/:questionId', quizSetController.findQuestionById);

router.get('/quiz/:questionId', quizSetController.findQuizById);

module.exports = router; 
