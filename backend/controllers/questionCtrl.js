
const Question = require("../models/questionModel");

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
  












module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getAllQuestion,
    fetchFilteredQuestions 
    
  };


