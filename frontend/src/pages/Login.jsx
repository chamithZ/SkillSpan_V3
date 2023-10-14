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
    
    // Validate username and password
    if (!formData.username || !formData.password) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter both username and password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:1337/login', formData);
      if (response.status === 200) {
        const { token } = response.data;
  
        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);
  
        // Decode the token to get the user's role
        const userRole = getUserRoleFromToken(token);
  
        if (userRole === 'Admin') {
          // Redirect to the admin dashboard
          window.location.href = '/admindashboard'; // Replace with your admin dashboard URL
        } else if (userRole === 'Student') {
          // Redirect to the home page
          window.location.href = '/'; // Replace with your home page URL
        }
      } else {
        // Handle other login errors here
        Swal.fire({
          title: 'Login Error',
          text: 'Invalid username or password. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Login error', response.data);
      }
    } catch (error) {
      // Handle network or other errors
      Swal.fire({
        title: 'Login Error',
        text: 'Invalid Login Creditials. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Login error', error);
    }
  };
  
  
  // Function to decode the user's role from the JWT
  const getUserRoleFromToken = (token) => {
    try {
      // Decode the token and extract the user's role
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'Unknown';
    };
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-blue-500 mb-4">Welcome Back!</h2>
        <p className="text-gray-500 mb-4">Continue your learning journey.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-blue-500">User Name</label>
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
