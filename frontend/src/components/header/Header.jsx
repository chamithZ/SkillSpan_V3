import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
        <nav className="space-x-4">
          <Link
            to="/home"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-lg
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
            text-lg
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
            to="/intern"
            className="
            hover:text-blue-700 hover:font-medium
            capitalize
            inline-block
            text-lg
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
            text-lg
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
            text-lg
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
      </div>
    </header>
  );
}

export default Header;
