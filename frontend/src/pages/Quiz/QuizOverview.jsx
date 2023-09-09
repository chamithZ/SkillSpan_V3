import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizOverview = () => {
  const [quizzes, setQuizzes] = useState([]); // State to store quizzes
  const [userAnswers, setUserAnswers] = useState([]); // State to store user answers as an array
  const [results, setResults] = useState(null); // State to store quiz results
  const [showResults, setShowResults] = useState(false); // State to control result display
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false); // State to control correct answer display

  const { quizSetId } = useParams(); // Get the quizSetId from the route params

  useEffect(() => {
    // Fetch quizzes for the selected quiz set when the component mounts
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    Axios.get(`/quiz/${quizSetId}`)
      .then((response) => {
        const quizSet = response.data;
        const quizIds = quizSet.question.quizzes;

        // Fetch individual quizzes by their IDs
        const fetchQuizPromises = quizIds.map((quizId) => {
          return Axios.get(`/quiz/quiz/${quizId}`);
        });

        Promise.all(fetchQuizPromises)
          .then((quizResponses) => {
            const fetchedQuizzes = quizResponses.map((quizResponse) => quizResponse.data);

            // Set the quizzes state with the fetched data
            setQuizzes(fetchedQuizzes);

            // Initialize userAnswers state with empty answers for each quiz
            const initialUserAnswers = new Array(fetchedQuizzes.length).fill(-1); // -1 represents no answer
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

  const handleAnswerChange = (quizIndex, selectedAnswer) => {
    // Update the userAnswers state when the user selects an answer
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[quizIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmitAnswers = () => {
    // Calculate the user's score based on selected answers and correct answers
    let score = 0;
    const totalQuizzes = quizzes.length;

    quizzes.forEach((quiz, index) => {
      if (userAnswers[index] === parseInt(quiz.question.correct_answer)) {
        score += 1;
      }
    });

    // Calculate the percentage score
    const percentageScore = ((score / totalQuizzes) * 100).toFixed(2);

    // Set the results state
    const resultsText = `Your score: ${score}/${totalQuizzes} (${percentageScore}%)`;
    setResults(resultsText);

    // Show correct answers
    setShowCorrectAnswers(true);

    // Set the flag to show results
    setShowResults(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Display the fetched quizzes */}
      {quizzes.map((quiz, index) => (
        <div key={quiz._id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">{quiz.question.question}</h3>
          <div className="space-y-2">
            {quiz.question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex flex-col mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`quiz_${quiz.question._id}`}
                    value={answerIndex}
                    onChange={() => handleAnswerChange(index, answerIndex)}
                    checked={userAnswers[index] === answerIndex}
                    className="form-radio h-5 w-5 text-indigo-600"
                    disabled={showResults} // Disable input after submission
                  />
                  <span className="ml-2">{answer}</span>
                </label>
              </div>
            ))}
          </div>
          {showCorrectAnswers && (
            <div className="mt-2 text-green-700">
              Correct Answer: {quiz.question.answers[parseInt(quiz.question.correct_answer)]}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmitAnswers}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        disabled={showResults} // Disable button after submission
      >
        Submit Answers
      </button>

      {showResults && (
        <div className="mt-4 p-4 bg-green-200 border border-green-600 rounded-md">
          <strong className="text-lg text-green-800">Results:</strong>
          <p className="mt-2 text-green-800">{results}</p>
        </div>
      )}
    </div>
  );
};

export default QuizOverview;
