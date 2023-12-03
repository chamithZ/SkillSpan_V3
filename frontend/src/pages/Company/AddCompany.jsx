import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Ripple,
  Input,
  initTE,
} from "tw-elements";

function AddCompany() {

  const jwtToken = localStorage.getItem('jwtToken');
  const user = JSON.parse(atob(jwtToken.split('.')[1]));

  useEffect(() => {
    initTE({ Ripple, Input });
  });

  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    companyRegID: '',
    industry: '',
    contactNumber: '',
    email: '',
    companyDetails: '',
    userId :user.userId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:1337/company/add', formData)
      .then((response) => {
        console.log('Company added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding company:', error);
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 sm:py-15 lg:px-8 flex items-center">
      <div className="w-2/3 p-8">
        <h1 className="text-2xl lg:text-4xl font-bold py-6">Company Details</h1>
        <div className="shadow-lg border-2 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg lg:text-xl mb-2">Name:</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Address:</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Company Reg ID:</label>
              <input
                type="text"
                name="companyRegID"
                value={formData.companyRegID}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Industry:</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg lg:text-xl mb-2">Company Description:</label>
              <textarea
                type="text"
                name="companyDetails"
                value={formData.companyDetails}
                onChange={handleChange}
                className="w-full h-32 border rounded-lg p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/3 p-8">
        {/* Add your image or content here */}
        <img
          src="/images/bg_c.png"
          alt="Your Image"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default AddCompany;