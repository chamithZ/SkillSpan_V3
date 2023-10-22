import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateQuestion() {
  const { questionId } = useParams();
  console.log(questionId);

  const typeOptions = [
    { label: 'Multiple Choice', value: 'Multiple Choice' },
    { label: 'True/False', value: 'True/False' },
    { label: 'Short Answer', value: 'Short Answer' },
    { label: 'Other', value: 'Other' },
  ];

  const levelOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
  ];

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    question: '',
    output: '',
    answer: '',
    level: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (questionId) {
      // Fetch question details based on questionId and populate the form fields
      axios
        .get(`/question/find/${questionId}`)
        .then((response) => {
          const { title, type, question, output, answer, level } = response.data;
          setFormData({ title, type, question, output, answer, level });
        })
        .catch((error) => {
          console.error('Error fetching question details:', error);
        });
    }
  }, [questionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.question) {
      newErrors.question = 'Question is required';
    }

    if (!formData.output) {
      newErrors.output = 'Output is required';
    }

    if (!formData.answer) {
      newErrors.answer = 'Answer is required';
    }

    if (!formData.level) {
      newErrors.level = 'Level is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setLoading(true); // Set loading to true only if the form is valid
  
      if (questionId) {
        // Update the question if questionId is provided
        axios
          .put(`/question/update/${questionId}`, formData)
          .then((response) => {
            console.log('Question updated successfully:', response.data);
  
            Swal.fire({
              title: 'Success!',
              text: 'Question has been updated successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              window.location.href = '/admindashboard';
            });
          })
          .catch((error) => {
            console.error('Error updating question:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false regardless of success or failure
          });
      } else {
        // Handle the case when no questionId is provided (adding a new question)
        axios
          .post('/question/add', formData)
          .then((response) => {
            console.log('Question added successfully:', response.data);
  
            Swal.fire({
              title: 'Success!',
              text: 'Question has been added successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              window.location.href = '/admindashboard';
            });
          })
          .catch((error) => {
            console.error('Error adding a question:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false regardless of success or failure
          });
      }
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {questionId ? 'Update Question' : 'Add Question'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select Type</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.type && <p className="text-red-500">{errors.type}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Question:</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.question && <p className="text-red-500">{errors.question}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Output:</label>
          <textarea
            name="output"
            value={formData.output}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.output && <p className="text-red-500">{errors.output}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Answer:</label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.answer && <p className="text-red-500">{errors.answer}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold">Level:</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select Level</option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.level && <p className="text-red-500">{errors.level}</p>}
        </div>
        <div>
          <button
            type="submit"
            className={`${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
            } text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateQuestion;
