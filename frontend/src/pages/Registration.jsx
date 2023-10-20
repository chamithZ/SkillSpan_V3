import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Student',
    email: '',
    contactNumber: '',
    campus: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      // Check if registration was successful
      if (response.status === 201) {
        // Show a success message using SweetAlert
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have successfully registered.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the login page after clicking OK
          window.location.href = '/login'; 
        });
      } else {
        // Handle other registration errors here
        console.error('Registration error', response.data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Registration error', error);
    }
  };
  

  return (
    <div className="container mx-auto pt-5 bg-blue-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl text-blue-500 font-semibold text-center mb-4">Join with SkillSpan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-blue-500">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-blue-500">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="text-blue-500">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-blue-500"
            >
              <option value="Student">Student</option>
              <option value="Company">Company</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-blue-500">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="text-blue-500">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="campus" className="text-blue-500">Campus</label>
            <input
              type="text"
              id="campus"
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="text-blue-500">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
