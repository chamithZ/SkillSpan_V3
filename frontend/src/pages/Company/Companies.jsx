import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Companies() {
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

  return (
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
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Companies;
