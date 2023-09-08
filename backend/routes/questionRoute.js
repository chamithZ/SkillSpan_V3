const express=require("express");


const {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getAllQuestion,
    fetchFilteredQuestions
   

  } = require("../controllers/questionCtrl");



const router =express.Router();
//Create
router.post("/add",createQuestion)

//update

router.put("/update/:id",updateQuestion)

//Delete

router.delete("/delete/:id",deleteQuestion)

//get
router.get("/find/:id", getQuestion)

// Get all hotels
router.get("/getallQuestion",getAllQuestion)



router.get('/filter', async (req, res) => {
  const { type, title, level } = req.query;

  try {
    const filteredQuestions = await fetchFilteredQuestions(type, title, level);
    res.json(filteredQuestions);
  } catch (error) {
    console.error('Error fetching filtered questions:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

module.exports = router    