import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/login', formData);
      // Check if login was successful
      if (response.status === 200) {
        // Show a success message using SweetAlert
        const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
        Swal.fire({
          title: 'Login Successful',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          
          window.location.href = '/'; // Replace with your home page URL
        });
      } else {
        // Handle other login errors here
        console.error('Login error', response.data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-blue-500 mb-4">Welcome Back!</h2>
        <p className="text-gray-500 mb-4">Continue your learning journey.</p>
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
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
