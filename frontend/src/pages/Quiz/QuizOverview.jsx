import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

// Loader component
const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="font-medium text-center">
      <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4"></div>
      <div className="inline-block w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4"></div>
    </div>
  </div>
);

const QuizOverview = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [percentageScore, setPercentageScore] = useState(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [quizSetTitle, setQuizSetTitle] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let timer;
  const { quizSetId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please log in to access this page!',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

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

            setLoading(false); // Set loading to false once the data is fetched
          })
          .catch((error) => {
            console.error('Error fetching quizzes:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quiz set:', error);
      });
  };


  const handleGenerateCertificate = () => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
    console.log('Token:', token);
  
    if (results) {
      const pdf = new jsPDF();
      pdf.setFont('helvetica');
  
      // Set blue color for the border
      pdf.setDrawColor(0, 0, 255);
  
      // Draw a rectangle border around the certificate
      pdf.rect(10, 10, 190, 270); // Adjust the coordinates and size as needed
  
      pdf.setTextColor(0, 0, 255);
  
      // Calculate the x-coordinate for centered text
      const pageWidth = pdf.internal.pageSize.getWidth();
      const textX = 20; // Set the x-coordinate to move the text to the left side
  
      pdf.text(textX, 20, 'SkillSpan');
  
      pdf.setTextColor(0, 0, 0);
  
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  
      // Get the username from the token payload
      const username = tokenPayload.name;
  
      pdf.setFontSize(12);
  
      pdf.setFontSize(30);
      pdf.text(textX, 50, `Certificate of Completion `);
      pdf.text(textX, 80, ` ${quizSetTitle}`)
  
      // Calculate x-coordinate for the username text
      const usernameWidth = pdf.getStringUnitWidth(`This Certificate Awarded To - ${username}`) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const usernameX = textX; // Set the x-coordinate to move the text to the left side
      pdf.setFontSize(20);
      pdf.text(usernameX, 100, `This Certificate Awarded To - ${username}`);
      pdf.text(textX, 120, ` ${results}`);
  
      // Determine the level based on the user's score
      let level = 'Beginner';
      if (percentageScore >= 80) {
        level = 'Advanced';
      } else if (percentageScore >= 60) {
        level = 'Intermediate';
      }
  
      pdf.text(textX, 140, `Level - ${level}`);
      pdf.text(textX, 180, 'All the Best for your Future Endeavors!');
      pdf.text(textX, 160, `Issued Date - ${new Date().toDateString()}`);
      pdf.save('SkillSpanCertificate.pdf');
    }
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
  
    const resultsText = `Score: ${score}/${totalQuizzes} (${percentageScore}%)`;
    setResults(resultsText);
    setPercentageScore(percentageScore);
  
    setShowCorrectAnswers(true);
    setQuizSubmitted(true);
  
    // Clear the timer when the answers are submitted
    clearInterval(timer);
  };
  
  const startTimer = () => {
    timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0 && !quizSubmitted) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);
  };
  

  return (
    <div className="p-4 space-y-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{quizSetTitle}</h1>
            </div>
            <div className="text-red-500 font-bold">
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
                       disabled={quizSubmitted}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={quizSubmitted}
          >
            Submit Answers
          </button>

          {quizSubmitted && results && (
            <div className="mt-4 p-4 bg-gray-100 border border-green-600 rounded-md">
              <strong className="text-lg text-green-800">Results:</strong>
              <p className="mt-2 text-green-800">{results}</p>
              <button
                onClick={handleGenerateCertificate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Generate Your Certificate
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizOverview;
