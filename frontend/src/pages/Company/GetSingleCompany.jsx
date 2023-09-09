import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
        console.error('Error fetching company details:', error);
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
        console.error('Error fetching RoadMaps:', error);
      });
  };

  const showRoadMapDetails = (roadMapId) => {
    navigate(`/company/roadMap/${roadMapId}`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">{company.Name}</h1>
            <div>
              <a href={`mailto:${company.email}`} className="text-blue-500 hover:underline">
                {company.email}
              </a>
              <p className="text-gray-500">{company.contactNumber}</p>
            </div>
          </div>
          <div className="mb-4">
            <img
              src={`/images/company${id}.png`} // Replace with the actual image path
              alt={`Logo of ${company.Name}`}
              className="object-cover w-full h-40 rounded-lg shadow"
            />
          </div>
          <button
            onClick={fetchRoadMaps}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Show RoadMaps
          </button>
          {showRoadMaps && (
            <div>
              <h2 className="text-xl font-semibold mt-4">RoadMaps</h2>
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
                      <td className="py-2 px-4">{roadMap.skillsCovered.join(', ')}</td>
                      <td className="py-2 px-4">{roadMap.progressTracking ? 'Yes' : 'No'}</td>
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
    </div>
  );
  
}

export default GetSingleCompany;
