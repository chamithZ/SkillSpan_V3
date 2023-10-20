import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateCompany() {
  // Define state variables to store form input values
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    companyRegID: '',
    industry: '',
    contactNumber: '',
    email: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Get the company ID from the URL params
  const { id } = useParams();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the company data by ID
    axios
      .put(`http://localhost:1337/company/update/${id}`, formData)
      .then((response) => {
        console.log('Company updated successfully:', response.data);
        // Handle success, e.g., show a success message or redirect to a new page
      })
      .catch((error) => {
        console.error('Error updating company:', error);
        // Handle error, e.g., show an error message to the user
      });
  };

  // Function to fetch existing company data and populate the form
  useEffect(() => {
    // Send a GET request to retrieve the company data by ID
    axios
      .get(`http://localhost:1337/company/getSingle/${id}`)
      .then((response) => {
        const companyData = response.data;
        // Set the form data with the retrieved company data
        setFormData(companyData);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-semibold mb-4">Update Company</h1>
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
      <label className="block text-sm font-semibold">Description:</label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Description"
            maxLength="300"
            required
          />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Update
        </button>
      </div>
    </form>
  </div>
  
  );
}

export default UpdateCompany;