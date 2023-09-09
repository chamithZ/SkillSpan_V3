import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizOverview = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);

  const { quizSetId } = useParams();

  useEffect(() => {
    // Fetch quizzes for the selected quiz set when the component mounts
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    console.log(quizSetId);
    Axios.get(`/quiz/${quizSetId}`) // Assuming you have an API endpoint to fetch quiz set data
      .then((response) => {
        console.log('Fetched quiz set:', response.data);

        const quizSet = response.data;
        const quizIds = quizSet.quizzes || [];
        console.log(quizIds)
        // Fetch individual quizzes by their IDs
        const fetchQuizPromises = quizIds.map((quizId) => {
          console.log(quizId)
          return Axios.get(`quiz/quiz/${quizId}`); // Replace with your API endpoint
        });

        Promise.all(fetchQuizPromises)
          .then((quizResponses) => {
            const fetchedQuizzes = quizResponses.map((quizResponse) => quizResponse.data);
            console.log('Fetched quizzes:', fetchedQuizzes);

            setQuizzes(fetchedQuizzes);

            // Initialize userAnswers state with empty answers for each quiz
            const initialUserAnswers = {};
            fetchedQuizzes.forEach((quiz) => {
              initialUserAnswers[quiz._id] = -1; // -1 represents no answer
            });
            setUserAnswers(initialUserAnswers);
          })
          .catch((error) => {
            console.error('Error fetching quizzes:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quiz set:', error);
      });
  };

  const handleAnswerChange = (quizId, selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [quizId]: selectedAnswer });
  };

  const handleSubmitAnswers = () => {
    // Send userAnswers to your backend for evaluation
    Axios.post(`/quiz/quizsets/${quizSetId}/evaluate`, userAnswers)
      .then((response) => {
        console.log('Submission response:', response.data);
        setResults(response.data.results);
      })
      .catch((error) => {
        console.error('Error evaluating answers:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Question Set</h1>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white border p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">{quiz.question}</h2>
            <ul>
              {quiz.answers.map((answer, index) => (
                <li key={index} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name={`quiz_${quiz._id}`}
                      value={index}
                      checked={userAnswers[quiz._id] === index}
                      onChange={() => handleAnswerChange(quiz._id, index)}
                    />{' '}
                    {answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No quizzes available</p>
      )}
      {quizzes.length > 0 && (
        <button
          onClick={handleSubmitAnswers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Answers
        </button>
      )}
      {results && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Results:</h2>
          {quizzes.map((quiz, index) => (
            <div key={quiz._id} className="mb-4">
              <p>
                <strong>Question {index + 1}:</strong> {quiz.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {quiz.answers[userAnswers[quiz._id]]}
              </p>
              <p>
                <strong>Correct Answer:</strong> {quiz.answers[quiz.correct_answer]}
              </p>
              <p>
                <strong>Result:</strong> {results[quiz._id] ? 'Correct' : 'Incorrect'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizOverview;
