import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from '../../components/header/Header';
import Swal from 'sweetalert2';

const ViewQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Fetch all quizzes when the component mounts
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    Axios.get('/quiz/quizzes') // Replace with API endpoint
      .then((response) => {
        setQuizzes(response.data.quizzes);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
      });
  };

  const handleFilter = () => {
    if (filterType === '') {
      setFilteredQuizzes([]);
    } else {
      const filtered = quizzes.filter((quiz) => quiz.type === filterType);
      setFilteredQuizzes(filtered);
    }
  };

  const handleDeleteQuiz = (quizId) => {
    Swal.fire({
      title: 'Delete Quiz',
      text: 'Are you sure you want to delete this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`/quiz/quizsets/${quizId}`)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'The quiz has been deleted.',
              icon: 'success',
              timer: 2000, // Optional: automatically close the alert after 2 seconds
            });

            // After successful deletion, refresh the list of quizzes
            fetchQuizzes();
          })
          .catch((error) => {
            console.error('Error deleting quiz:', error);
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while deleting the quiz.',
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-medium mb-4 text-blue-800">Quizzes</h1>
        <div className="flex mb-4">
          <select
            className="border rounded-l p-2 border-blue-400 rounded-md text-darkblue bg-lightblue"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="js">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
          </select>
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          {(filterType === '' ? quizzes : filteredQuizzes).map((quiz) => (
            <div key={quiz._id} className="bg-white border p-4 rounded shadow-md mb-4">
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-600">{quiz.description}</p>
              <p className="text-gray-500 mt-2">Type: {quiz.type}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="text-red-500 hover:text-red-700 mr-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuizList;
