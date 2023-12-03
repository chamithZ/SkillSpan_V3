import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';

function ManageCompany() {
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSeeMoreClick = (companyId) => {
    navigate(`/company/getOneCompany/${companyId}`); // Use navigate to go to the "getSingleCompany" route
  };

  useEffect(() => {
    // Fetch all companies from the backend
    axios
      .get('http://localhost:1337/company/getAll')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const getAll = () =>{
    axios
    .get('http://localhost:1337/company/getAll')
    .then((response) => {
      setCompanies(response.data);
    })
    .catch((error) => {
      console.error('Error fetching companies:', error);
    });
  }

  const handleDeleteQuiz = (quizId) => {
    // Use the quizId to delete the quiz on the backend using Axios
    axios.delete(`http://localhost:1337/company/delete/${quizId}`)
      .then((response) => {
        // Handle successful deletion
        console.log("Quiz deleted:", response.data);
        // Optionally, you can update the UI to remove the deleted quiz from the list
        getAll();
      })
      .catch((error) => {
        console.error('Error deleting quiz:', error);
      });

      
  };

  const handleEditCompany = (companyId)=>{
    navigate(`/company/update/${companyId}`);
  }

  return (<div>
    
    <div className="container mx-auto p-20">

    <div className="grid grid-cols-1 justify-between sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20 ">
      {companies.map((company, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={`/images/company${index + 1}.png`} // Replace with the actual image path
              alt={`Logo of ${company.Name}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{company.Name}</h2>
            <p className="text-gray-500 mb-2">{company.industry}</p>
            <p className="text-sm">{company.Address}</p>
            <button
              onClick={() => handleSeeMoreClick(company._id)} // Pass the company ID as a parameter
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full "
            >
              See More
            </button>
            <button
              onClick={() => handleEditCompany(company._id)} // Add a function for editing
              className="mt-3 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 w-full"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteQuiz(company._id)} // Add a function for deleting
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full mt-3"
            >
              Delete
            </button>
            
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default ManageCompany;