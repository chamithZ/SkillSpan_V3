import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizOverview = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [quizSetTitle, setQuizSetTitle] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Flag to track if the quiz is submitted
  let timer;

  const { quizSetId } = useParams();

  useEffect(() => {
    fetchQuizSet();
    startTimer();
  }, []);

  const fetchQuizSet = () => {
    Axios.get(`/quiz/${quizSetId}`)
      .then((response) => {
        const quizSet = response.data;
        const quizIds = quizSet.question.quizzes;

        setQuizSetTitle(quizSet.question.title);

        const fetchQuizPromises = quizIds.map((quizId) => {
          return Axios.get(`/quiz/quiz/${quizId}`);
        });

        Promise.all(fetchQuizPromises)
          .then((quizResponses) => {
            const fetchedQuizzes = quizResponses.map((quizResponse) => quizResponse.data);

            setQuizzes(fetchedQuizzes);

            const initialUserAnswers = new Array(fetchedQuizzes.length).fill(-1);
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
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[quizIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmitAnswers = () => {
    let score = 0;
    const totalQuizzes = quizzes.length;

    quizzes.forEach((quiz, index) => {
      if (userAnswers[index] === parseInt(quiz.question.correct_answer)) {
        score += 1;
      }
    });

    const percentageScore = ((score / totalQuizzes) * 100).toFixed(2);

    const resultsText = `Your score: ${score}/${totalQuizzes} (${percentageScore}%)`;
    setResults(resultsText);

    setShowCorrectAnswers(true);
    setShowResults(true);

    // Pause the timer when completed
    clearInterval(timer);

    // Set the quizSubmitted flag to true
    setQuizSubmitted(true);
  };

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0 && !quizSubmitted) {
          return prevTime - 1;
        } else {
          // Timer is completed or quiz is submitted, stop the timer
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quizSetTitle}</h1>
        </div>
        <div className="text-red-600 font-bold">
          Time Left: {Math.floor(timeLeft / 3600)}h {Math.floor((timeLeft % 3600) / 60)}m {timeLeft % 60}s
        </div>
      </div>

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
                    disabled={showResults || quizSubmitted}
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
        disabled={showResults || quizSubmitted}
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
