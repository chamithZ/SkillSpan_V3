import axios from 'axios';
import React, { useState } from 'react';

function AddCompany() {
  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    companyRegID: '',
    industry: '',
    contactNumber: '',
    email: '',
  });

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

    // Send a POST request to your backend URL
    axios
      .post('http://localhost:1337/company/add', formData)
      .then((response) => {
        console.log('Company added successfully:', response.data);
        // Handle success, e.g., show a success message or redirect to a new page
      })
      .catch((error) => {
        console.error('Error adding company:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Address:</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Company Reg ID:</label>
          <input
            type="text"
            name="companyRegID"
            value={formData.companyRegID}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
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

export default AddCompany;
