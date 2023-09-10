import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from './user.png';
import Swal from 'sweetalert2';

function Header() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const isLoggedIn = () => {
   
    const token = localStorage.getItem('jwtToken'); // Replace with your token storage method
    return !!token; // Return true if the token exists, false otherwise
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear the authentication data (e.g., JWT token)
        localStorage.removeItem('jwtToken');
  
        window.location.href = '/'; // Replace with your login page URL
        setShowLogoutButton(false);
      }

    });
  };

  return (
    <header className="border-b-2 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-semibold text-blue-500 hover:font-bold "
          >
            SkillSpan
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 flex-grow text-right">
          <Link
            to="/"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-2xl
            text-semi bold
            text-blue-700
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-300
            before:via-blue-400
            before:to-blue-600
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Home
          </Link>
          <Link
            to="/questions"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-2xl
            text-blue-700
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-300
            before:via-blue-400
            before:to-blue-600
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Questions
          </Link>
          <Link
            to="/company/"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-2xl
            text-blue-700
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-300
            before:via-blue-400
            before:to-blue-600
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Intern Supporter 
          </Link>
          <Link
            to="/quizlist"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-2xl
            text-blue-700
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-300
            before:via-blue-400
            before:to-blue-600
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            Quiz
          </Link>
          <Link
            to="/chat"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-2xl
            text-blue-700
            relative
            cursor-pointer
            transition-all
            duration-400
            before:content-['']
            before:absolute
            before:-bottom-2
            before:left-0
            before:w-0
            before:h-1.5
            before:rounded-full
            before:opacity-0
            before:transition-all
            before:duration-300
            before:bg-gradient-to-r
            before:from-blue-300
            before:via-blue-400
            before:to-blue-600
            hover:before:w-full
            hover:before:opacity-100
    "
          >
            AI Bot
          </Link>

        </nav>
        {isLoggedIn() && (
          <div className="text-blue-500 hover:text-blue-700" onClick={handleLogout}>
          <img
            src={img1}
            alt="User"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
        )}
      </div>
    </header>
  );
}

export default Header;
