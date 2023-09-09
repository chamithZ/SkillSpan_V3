import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizOverview = () => {
  const [quizzes, setQuizzes] = useState([]); // State to store quizzes
  const [userAnswers, setUserAnswers] = useState({}); // State to store user answers
  const [results, setResults] = useState(null); // State to store quiz results

  const { quizSetId } = useParams(); // Get the quizSetId from the route params

  useEffect(() => {
    // Fetch quizzes for the selected quiz set when the component mounts
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    console.log('Fetching quizzes for quiz set ID:', quizSetId);

    Axios.get(`/quiz/${quizSetId}`)
      .then((response) => {
        console.log('Fetched quiz set:', response.data);

        const quizSet = response.data;

        const quizIds = quizSet.question.quizzes;

        console.log('Quiz IDs:', quizIds);

        // Fetch individual quizzes by their IDs
        const fetchQuizPromises = quizIds.map((quizId) => {
          console.log('Fetching quiz with ID:', quizId);
          return Axios.get(`/quiz/quiz/${quizId}`);
        });

        Promise.all(fetchQuizPromises)
          .then((quizResponses) => {
            const fetchedQuizzes = quizResponses.map((quizResponse) => quizResponse.data);
            console.log('Fetched quizzes:', fetchedQuizzes);

            // Initialize userAnswers state with empty answers for each quiz
            const initialUserAnswers = {};
            fetchedQuizzes.forEach((quiz) => {
              initialUserAnswers[quiz._id] = -1; // -1 represents no answer
            });

            // Set the quizzes state with the fetched data
            setQuizzes(fetchedQuizzes);

            // Set the userAnswers state
            console.log(quizzes);
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
    // Update the userAnswers state when the user selects an answer
    setUserAnswers({ ...userAnswers, [quizId]: selectedAnswer });
  };

  const handleSubmitAnswers = () => {
    // Send userAnswers to your backend for evaluation
    Axios.post(`/quiz/quizsets/${quizSetId}/evaluate`, userAnswers)
      .then((response) => {
        console.log('Submission response:', response.data);
        setResults(response.data.results); // Set the results state with the evaluation data
      })
      .catch((error) => {
        console.error('Error evaluating answers:', error);
      });
  };

  return (
    <div>
    </div>
  );
};

export default QuizOverview;
