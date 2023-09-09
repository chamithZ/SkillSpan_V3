import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import cover from './cover.png';

function Home() {
  // Check if the user is logged in based on your authentication logic
  // For example, you might check for the presence of a JWT token in localStorage
  const isLoggedIn = () => {
    // Check if the user is logged in by retrieving the token from localStorage
    const token = localStorage.getItem('jwtToken');
    return !!token; // Return true if the token exists, false otherwise
  };

  return (
    <div>
      <div className="bg-white">
        <Header />
      
        <header className="bg-blue-200 text-black py-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-semibold">
              Welcome to{' '}
              <Typed
                className="text-4xl sm:text-4xl font-bold text-[#3b5bc5]"
                strings={['SkillSpan']}
                typeSpeed={120}
                backSpeed={140}
                loop
              />{' '}
            </h1>
            <p className="mt-2 text-lg">Empowering Students Through Knowledge</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8 mb-16"> {/* Add mb-16 (margin-bottom) */}
          <section className="text-center">
            <div className="mt-2">
              <img
                src={cover}
                alt="Cover Photo"
                className="w-full rounded-lg"
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {/* Feature 1 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Interactive Lessons</h3>
                  <p className="mt-2 text-gray-600">Engage with interactive Questions. Train your brain </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Internship support</h3>
                  <p className="mt-2 text-gray-600">Sharpen your skills with Intern Support. Best Intern Trainer</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Community Forum</h3>
                  <p className="mt-2 text-gray-600">Connect with other learners in our community forum.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Progress Tracking</h3>
                  <p className="mt-2 text-gray-600">Monitor your progress and track your achievements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-1 text-center">
            <h2 className="text-2xl font-semibold mb-3">Ready to Get Started?</h2>
            <p className="text-gray-600">Join our platform and embark on a learning journey like never before.</p>

            {isLoggedIn() ? ( // Check if the user is logged in
              // If the user is logged in, display a message
              <p className="text-gray-600 mt-2">You are already logged in.</p>
            ) : (
              // If the user is not logged in, show the "Sign Up" and "Login" buttons
              <>
                <Link to="/register">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-1">
                    Sign Up Now
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-gray-200 hover:bg-gray-400 text-blue-500 font-semibold py-2 px-4 rounded-full mt-1 ml-2">
                    Login Now
                  </button>
                </Link>
              </>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
