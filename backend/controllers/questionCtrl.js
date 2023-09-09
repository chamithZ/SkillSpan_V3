
const Question = require("../models/questionModel");
const QuizSet = require("../models/quizSetModel");

  const createQuestion = async (req, res) => {
   
  
        
        const newQujestion = new Question({ 
          ...req.body,   
       
        }); 
  
      
        await newQujestion.save();
  
   
        res.status(200).json(newQujestion); 
      }

const  updateQuestion =async (req,res,next)=>{
    try{
        const updatedQuestion= await Question.findByIdAndUpdate(req.params.id, {$set:req.body}
            ,{new:true})
        res.status(200).json(updatedQuestion);

    }catch(err){ 
        next(err);
    }
}


const deleteQuestion =async (req,res,next)=>{
    try{
        console.log(req.params.id)
        const deleteQuestion= await Question.findByIdAndDelete(req.params.id);
        res.status(200).json("Question has been deleted.");

    }catch(err){
        res.status(500).json(err);
    }
}
 

const getQuestion =async (req,res,next)=>{
    try{
        const viewQuestion= await Question.findById(req.params.id);
        res.status(200).json(viewQuestion);

    }catch(err){
        next(err);
    }
}


const getAllQuestion = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Question.find({
        ...others
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const fetchFilteredQuestions = async (type, title, level) => {
    try {
      let filter = {};
  
      // Build the filter object based on selected criteria
      if (type) {
        filter.type = type;
      }
      if (title) {
        filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      }
      if (level) {
        filter.level = level;
      }
  
      // Find questions that match the filter criteria
      const filteredQuestions = await Question.find(filter);
  
      return filteredQuestions;
    } catch (error) {
      throw error;
    }
  };

 

// Controller to get all quiz sets
exports.getAllQuizSets = async (req, res) => {
  try {
    const quizSets = await QuizSet.find();
    res.status(200).json({ quizSets });
  } catch (error) {
    console.error('Error getting all quiz sets:', error);
    res.status(500).json({ error: 'An error occurred while fetching quiz sets.' });
  }
};

// Controller to get a specific quiz set by ID
exports.getQuizSetById = async (req, res) => {
  const { id } = req.params;

  try {
    const quizSet = await QuizSet.findById(id).populate('quizzes'); // Populate the quizzes array with actual quiz documents
    if (!quizSet) {
      return res.status(404).json({ error: 'Quiz set not found' });
    }

    res.status(200).json({ quizSet });
  } catch (error) {
    console.error('Error getting quiz set by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the quiz set.' });
  }
};
  
exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quizSet = await QuizSet.findById(id).populate('quizzes'); // Populate the quizzes array with actual quiz documents
    if (!quizSet) {
      return res.status(404).json({ error: 'Quiz set not found' });
    }

    res.status(200).json({ quizSet });
  } catch (error) {
    console.error('Error getting quiz set by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the quiz set.' });
  }
};
  












module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getAllQuestion,
    fetchFilteredQuestions 
    
  };


