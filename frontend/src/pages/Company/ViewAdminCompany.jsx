import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";

function ViewAdminCompany() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const handleSeeMoreClick = (companyId) => {
    navigate(`/company/getOneCompany/${companyId}`);
  };

  // Function to handle company deletion
  const handleDeleteCompany = (companyId) => {
    // Make a DELETE request to delete the company by its ID
    axios
      .delete(`http://localhost:1337/company/delete/${companyId}`)
      .then((response) => {
        // Remove the deleted company from the list of companies
        setCompanies(companies.filter((company) => company._id !== companyId));
        console.log("Company deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
      });
  };

  useEffect(() => {
    // Fetch all companies from the backend
    axios
      .get("http://localhost:1337/company/getAll")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  return (
    <div>
     
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
                  onClick={() => handleSeeMoreClick(company._id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                >
                  See More
                </button>
                <button
                  onClick={() => handleDeleteCompany(company._id)} // Delete the company on button click
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
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

export default ViewAdminCompany;