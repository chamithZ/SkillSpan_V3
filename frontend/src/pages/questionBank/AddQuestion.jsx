import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';


function AddQuestion() {
  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    question: '',
    output: '',
    answer: '',
    level: '',
    HotelImg: '',
    isApproved: true, 
  });

  // Define options for Type and Level dropdowns
  const typeOptions = [
    { label: 'Select Language', value: 'Multiple Choice' },
    { label: 'Java', value: 'java' },
    { label: 'JS', value: 'js' },
    { label: 'C', value: 'c' },
    { label: 'C#', value: 'C#' },
    { label: 'SQL', value: 'sql' },
    { label: 'Python', value: 'python' },
    { label: 'Other', value: 'Other' },
  ];

  const levelOptions = [
    { label: 'Easy', value: 'Easy' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Hard', value: 'Hard' },
  ];

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post('/question/add', formData)
      .then((response) => {
        console.log('Request successful:', response.data);
        
        // Display a SweetAlert notification for success
        Swal.fire({
          title: 'Success!',
          text: 'Question has been successfully added!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to another page (replace '/questions' with your desired URL)
          window.location.href = '/admindashboard';
        });
  
      })
      .catch((error) => {
        console.error('Request error:', error);
        // Handle error
      });
  };
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Question Form</h1>
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
        </div>
        <div>
          <label className="block text-sm font-semibold">Question:</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Output:</label>
          <textarea
            name="output"
            value={formData.output}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Answer:</label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
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
        </div>
        
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;
