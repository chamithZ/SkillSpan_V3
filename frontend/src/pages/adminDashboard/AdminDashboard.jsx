import React , {useEffect, useRef} from 'react';
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
  const jwtToken = localStorage.getItem('jwtToken');
  

  

  useEffect(()=>{
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    console.log(payload)
  },[])

  return (
    <div>
      <Header />

      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Dashboard</h2>
      <br/><br/>

        <div className="grid grid-cols-2 gap-4">
          {/* Quiz Admin Actions */}
          <section className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold mb-4">Quiz Admin Actions</h3>
            <Link to="/addQuestion">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Add Question
              </button>
            </Link>
            <Link to="/qadmin">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                View Questions
              </button>
            </Link>
            <Link to="/addQuiz">
              <button
                className="w-full bg-blue-200 hover.bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Add Quiz
              </button>
            </Link>
            <Link to="/qadminquizview">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg"
              >
                View Quizzes
              </button>
            </Link>
          </section>

          {/* Company/Internship Admin Actions */}
          <section className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold mb-4">Company/Internship Admin Actions</h3>
            <Link to="/manageCompany">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Manage Company
              </button>
            </Link>
            <Link to="/company/addCompany">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Add or Edit Company Details
              </button>
            </Link>
            <Link to="/addRoadMaps">
              <button
                className="w-full bg-blue-200 hover:bg-blue-300 text-black font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Add roadmaps
              </button>
            </Link>
            {/* Add more buttons for Company/Internship actions here */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
