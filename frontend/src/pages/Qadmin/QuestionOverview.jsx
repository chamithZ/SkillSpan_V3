import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuestionList() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const fetchFilteredQuestions = async () => {
    try {
      const response = await axios.get(`/question/filter?type=${filter}&search=${search}&level=${levelFilter}`);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error('Error fetching filtered questions:', error);
    }
  };

  useEffect(() => {
    fetchFilteredQuestions();
  }, [filter, search, levelFilter]);

  const handleUpdateQuestion = (questionId) => {
    
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      // Send a DELETE request to your API or backend to delete the question
      await axios.delete(`/question/delete/${questionId}`);
      console.log("Deleted")
      // After successful deletion, update the question list by refetching data
      fetchFilteredQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-medium mb-4 text-blue-800">
        Explore the questions
      </h1>

      {/* Filters */}
      {/* ... (Same as before) ... */}

      {/* Question List */}
      <div>
        {filteredQuestions.map((question) => (
          <div key={question._id} className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 text-darkblue bg-white mb-4">
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <p className="text-gray-600 mt-2">Language: {question.type}</p>
            <p className="text-gray-600">Difficulty: {question.level}</p>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <Link
                to={`/question/${question._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <button
                  className="px-3 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-700"
                >
                  View
                </button>
              </Link>
              <Link to={`updateQuestion/${question._id}`}>
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={() => handleUpdateQuestion(question._id)}
              >
                Update
              </button>
              </Link>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => handleDeleteQuestion(question._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
