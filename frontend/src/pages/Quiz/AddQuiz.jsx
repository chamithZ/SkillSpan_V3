import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const AddQuiz = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '', // Updated the state key to 'type'
    questions: [
      {
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 0,
      },
    ],
  });

  const handleInputChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name === 'title' || name === 'description') {
      updatedFormData[name] = value;
    } else if (name === 'question') {
      updatedFormData.questions[questionIndex].question = value;
    } else if (name === 'answer') {
      updatedFormData.questions[questionIndex].answers[answerIndex] = value;
    } else if (name === 'correctAnswer') {
      updatedFormData.questions[questionIndex].correctAnswer = parseInt(value);
    } else if (name === 'type') { // Handle 'type' changes
      updatedFormData.type = value;
    }

    setFormData(updatedFormData);
  };

  const addQuestion = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        ...prevFormData.questions,
        {
          question: '',
          answers: ['', '', '', ''],
          correctAnswer: 0,
        },
      ],
    }));
  };

  const removeQuestion = (questionIndex) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: prevFormData.questions.filter((_, index) => index !== questionIndex),
    }));
  };

  const submitForm = () => {
    // Send formData to your backend API
    Axios.post('/quiz/quizsets', formData)
      .then((response) => {
        console.log('Quiz submitted successfully:', response.data);
        
        // Display a SweetAlert notification for success
        Swal.fire({
          title: 'Success!',
          text: 'Quiz has been added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the admin page
          window.location.href = '/admindashboard';
        });
  
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
        // Handle errors
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Quiz Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange(e)}
          className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Language:</label>
        <select
          name="type" 
          value={formData.type}
          onChange={(e) => handleInputChange(e)}
          className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">Questions:</h3>
      {formData.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Question {questionIndex + 1}:
            </label>
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleInputChange(e, questionIndex)}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Answers:</h4>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="mb-2">
                <input
                  type="text"
                  name="answer"
                  value={answer}
                  onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                  className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Correct Answer:</label>
            <select
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={(e) => handleInputChange(e, questionIndex)}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
            >
              {question.answers.map((_, index) => (
                <option key={index} value={index}>
                  {`Answer ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => removeQuestion(questionIndex)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Remove Question
          </button>
        </div>
      ))}
      <div className="flex justify-between mb-4">
        <button onClick={addQuestion} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Question
        </button>
        <button onClick={submitForm} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default AddQuiz;
