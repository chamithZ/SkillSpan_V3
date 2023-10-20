import React , {useRef} from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
import cover from './cover.png';
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import heroImg3 from './heroImg3.jpg'

function Home() {
  // Check if the user is logged in based on your authentication logic
  const isLoggedIn = () => {
    // Check if the user is logged in by retrieving the token from localStorage
    const token = localStorage.getItem('jwtToken');
    return !!token; // Return true if the token exists, false otherwise
  };

  const targetComponentRef = useRef(null);

  const scrollToComponent = () => {
    window.scrollTo({
      top: targetComponentRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className='h-full'>
      <div className="bg-white ">
        <Header />
      
        <header className=" flex bg-gradient-to-br from-blue-300 to-blue-50 text-black py-0 text-center pt-0">
          <div className="container mx-auto w-1/2">
          <img src={heroImg3}/>
            </div>
            <div className='flex justify-center items-center  w-1/2'>
          <div className="container  mx-auto">
            <h1 className="text-4xl font-semibold">
              Welcome to{' '}
              <Typed
                className="text-4xl sm:text-4xl font-bold text-blue-700"
                strings={['SkillSpan']}
                typeSpeed={120}
                backSpeed={140}
                loop
              />{' '}
            </h1>
            <p className="mt-2 text-lg">Empowering Students Through Knowledge</p>
            <button onClick={scrollToComponent} className="bg-blue-500 hover:bg-blue-600 text-white  text-lg font-semibold py-2 px-4 rounded-md mt-2">Get Started</button>
          </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto" > {/* Add mb-16 (margin-bottom) */}
        
          <section className="text-center m-0">
            {/* <div className="mb-10">
              <img
                src={cover}
                alt="Cover Photo"
                className="w-full "
              />
            </div> */}

            {/* ----Card Section ----- */}
            <div className="flex flex-wrap justify-center bg-gradient-to-br from-blue-500 to-blue-100">
              {/* Feature 1 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 h-{200}">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Interactive Lessons</h3>
                  <img src={img1}/>
                  <p className="mt-2 text-gray-600">Engage with interactive Questions. Train your brain </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Internship support</h3>
                  <img src={img2}/>
                  <p className="mt-2 text-gray-600">Sharpen your skills with Intern Support. Best Intern Trainer</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Community Forum</h3>
                  <img src={img3}/>
                  <p className="mt-2 text-gray-600">Connect with other learners in our community forum.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Progress Tracking</h3>
                  <img src={img4}/>
                  <p className="mt-2 text-gray-600">Monitor your progress and track your achievements.</p>
                </div>
              </div>
            </div>
            {/* ---Call To Action ---- */}
            <section ref={targetComponentRef} className="my-5 text-center">
            <h2 className="text-4xl font-semibold mb-3">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg">Join our platform and embark on a learning journey like never before.</p>

            {isLoggedIn() ? ( // Check if the user is logged in
              // If the user is logged in, display a message
              <p className="text-gray-600 mt-2">You are already logged in.</p>
            ) : (
              // If the user is not logged in, show the "Sign Up" and "Login" buttons
              <>
                <Link to="/register">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white  text-lg font-semibold py-2 px-4 rounded-md mt-2">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-blue-50 hover:bg-blue-100 text-blue-900 text-lg font-semibold py-2 px-4 rounded-md mt-2 ml-2">
                    Login
                  </button>
                </Link>
              </>
            )}
            
          </section>
          </section>
          
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
