import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../header/Header';


function QuestionList() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const fetchFilteredQuestions = async () => {
    try {
      const response = await axios.get(`/question/filter?type=${filter}&search=${search}&level=${levelFilter}`);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error('Error fetching filtered questions:', error);
    }
  };

  useEffect(() => {
    fetchFilteredQuestions();
  }, [filter, search, levelFilter]);

  return (
    
<div>
<Header/>
    <div className="container mx-auto p-4">
       
      <h1 className="text-3xl font-medium mb-4 text-blue-800">
    Explore the questions</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-4 flex-wrap ">
        {/* Language Filter */}
        <select
          className="border p-2  border-blue-400 rounded-md text-darkblue bg-lightblue" 
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="">All Languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>

        {/* Difficulty Level Filter */}
        <select
          className="border p-2 rounded-md  border-blue-400 text-darkblue bg-lightblue" // Change dropdown selection colors
          onChange={(e) => setLevelFilter(e.target.value)}
          value={levelFilter}
        >
          <option value="">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded-md border-blue-400 text-darkblue bg-lightblue" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Question List */}
      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Link to={`/question/${question._id}`} key={question._id}>
            <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 text-darkblue bg-white">
              <h2 className="text-xl font-semibold">{question.title}</h2>
              <p className="text-gray-600 mt-2">
                Language: {question.type}
              </p>
              <p className="text-gray-600">Difficulty: {question.level}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

export default QuestionList;
