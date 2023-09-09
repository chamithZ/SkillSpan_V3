import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Typed from 'react-typed';
function Home() {
  return (
    <div>
    <div className="bg-white">
        <Header/>
      {/* Header */}
      <header className="bg-blue-200 text-black py-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-semibold">Welcome to {' '}
          <Typed
          className='text-4xl sm:text-4xl font-bold text-[#3b5bc5]'
          strings={['SkillSpan']}
          typeSpeed={120}
          backSpeed={140}
          loop
        /> </h1>
          <p className="mt-2 text-lg">Empowering Students Through Knowledge</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Explore your Feature</h2>
          <div className="flex flex-wrap justify-center">
            {/* Feature 1 */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Interactive Lessons</h3>
                <p className="mt-2 text-gray-600">Engage with interactive Questions.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Internship support</h3>
                <p className="mt-2 text-gray-600">Sharpen your skills with Intern Support.</p>
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
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600">Join our platform and embark on a learning journey like never before.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
            Sign Up Now
          </button>
        </section>
      </main>

     
     
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
