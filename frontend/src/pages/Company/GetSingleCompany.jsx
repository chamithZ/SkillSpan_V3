import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GetSingleCompany() {
  const [company, setCompany] = useState({});
  const [roadMaps, setRoadMaps] = useState([]);
  const [showRoadMaps, setShowRoadMaps] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch a single company's details from the backend based on the ID
    axios
      .get(`http://localhost:1337/company/getSingle/${id}`)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });
  }, [id]);

  const fetchRoadMaps = () => {
    // Fetch RoadMaps from the backend based on the company ID
    axios
      .get(`http://localhost:1337/company/getRoadmaps/${id}`)
      .then((response) => {
        setRoadMaps(response.data);
        setShowRoadMaps(true);
      })
      .catch((error) => {
        console.error("Error fetching RoadMaps:", error);
      });
  };

  const showRoadMapDetails = (roadMapId) => {
    navigate(`/company/roadMap/${roadMapId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
          <div className="lg:w-1/2 lg:mr-8">
            <img
              src={`/images/company6.png`} // Replace with the actual image path
              alt={`Logo of ${company.Name}`}
              className="w-72 rounded-lg object-cover shadow-lg m-32" // Adjust the width (e.g., w-32)
            />
          </div>
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h1 className="text-3xl font-bold mb-4">{company.Name}</h1>
            <p className="text-lg text-justify">{company.description}</p>
            <div className="flex justify-between mt-6">
              <div>
                <p className="font-semibold">Email:</p>
                <p>{company.email}</p>
              </div>
              <div>
                <p className="font-semibold">Contact:</p>
                <p>{company.contactNumber}</p>
              </div>
            </div>
            <button
              onClick={fetchRoadMaps}
              className="bg-[#41A4FF] text-white rounded-md font-bold py-2 px-4 mt-6 hover:bg-[#636363] focus:outline-none"
            >
              Show RoadMaps
            </button>
          </div>
        </div>
        {showRoadMaps && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">RoadMaps</h2>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100">Title</th>
                  <th className="py-2 px-4 bg-gray-100">Duration</th>
                  <th className="py-2 px-4 bg-gray-100">Skills Covered</th>
                  <th className="py-2 px-4 bg-gray-100">Progress Tracking</th>
                  <th className="py-2 px-4 bg-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roadMaps.map((roadMap) => (
                  <tr key={roadMap._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4">{roadMap.title}</td>
                    <td className="py-2 px-4">{roadMap.duration}</td>
                    <td className="py-2 px-4">
                      {roadMap.skillsCovered.join(", ")}
                    </td>
                    <td className="py-2 px-4">
                      {roadMap.progressTracking ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => showRoadMapDetails(roadMap._id)}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetSingleCompany;