import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../components/header/user.png'; 
import Swal from 'sweetalert2';

function Header() {

    const handleLogout = () => {
        Swal.fire({
          title: 'Confirm Logout',
          text: 'Are you sure you want to logout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('jwtToken');
            window.location.href = '/'; 
          }
        });
      };
  return (
    <header className="border-b-2 p-4 flex justify-between items-center">
      <div>
        <Link
          to="/"
          className="text-2xl font-semibold text-blue-500 hover:font-bold"
        >
          SkillSpan
        </Link>
      </div>

      {/* User Profile Icon */}
      <div>
        <img
          src={userIcon}
          alt="User Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}

function AdminDashboard() {
  return (
    <div>
    <Header />

    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>

      {/* Buttons Section */}
      <section className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-4">Admin Actions</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Add Question Button */}
          <Link to="/addQuestion">
            <button
              className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
            >
              Add Question
            </button>
          </Link>

          {/* View Questions Button */}
          <Link to="/qadmin">
            <button
              className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
            >
              View Questions
            </button>
          </Link>

          {/* Add Quiz Button */}
          <Link to="/addQuiz">
            <button
              className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
            >
              Add Quiz
            </button>
          </Link>

          {/* View Quizzes Button */}
          <Link to="/qadminquizview">
            <button
              className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
            >
              View Quizzes
            </button>
          </Link>

          {/* View Companies Button */}
          <Link to="/company">
            <button
              className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
            >
              View Companies
            </button>
          </Link>
        </div>
      </section>
    </div>
  </div>
  );
}

export default AdminDashboard;
