import React, { useEffect, useState } from 'react';
import axios from "axios";

const ViewMyCompany = () => {
  // Sample data for enrolled students
  const enrolledStudentsData = [
    { id: 1, name: 'Student 1', roadmap: 'Roadmap 1' },
    { id: 2, name: 'Student 2', roadmap: 'Roadmap 2' },
    // Add more student data
  ];

  // Sample data for road maps and assignments
  const roadMapsData = [
    { id: 1, title: 'Roadmap 1', assignments: 5 },
    { id: 2, title: 'Roadmap 2', assignments: 3 },
    // Add more roadmap data
  ];

  const [companies,setCompanies] = useState([])
  const [roadMaps,setRoadMaps]  = useState([])
  const jwtToken = localStorage.getItem('jwtToken');
  const user = JSON.parse(atob(jwtToken.split('.')[1]));

  const getCompanyId =()=>{
    const company = companies.find((company)=>company.userId === user.userId)

    return company._id || null;
  }

  const id = getCompanyId()

  useEffect(()=>{
    axios
      .get(`http://localhost:1337/company/getAll`)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });

      axios
      .get(`http://localhost:1337/company/getRoadmaps/${getCompanyId()}`)
      .then((response) => {
        setRoadMaps(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching RoadMaps:", error);
      });

    
    
  },[]);

  const fetchRoadMaps = (id) => {
    // Fetch RoadMaps from the backend based on the company ID
    axios
      .get(`http://localhost:1337/company/getRoadmaps/${id}`)
      .then((response) => {
        setRoadMaps(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching RoadMaps:", error);
      });
  };

  // State to control the number of displayed students
  const [showAllStudents, setShowAllStudents] = useState(false);

  // State to control the visibility of road maps table
  const [showRoadMapsTable, setShowRoadMapsTable] = useState(false);

  // Function to show road map details
  const showRoadMapDetails = (roadMapId) => {
    // You can implement the logic to show details for the selected road map here
    // You can use a modal or a separate component to display the details
    console.log(`Show details for Road Map ID: ${roadMapId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">View My Company</h2>

      {/* Enrolled Students */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Enrolled Students</h3>
        {/* Student table */}
        <table className="w-full border-collapse border border-gray-200">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Student ID</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Roadmap</th>
            </tr>
          </thead>
          <tbody>
            {showAllStudents
              ? enrolledStudentsData.map((student) => (
                  <tr key={student.id}>
                    <td className="border border-gray-200 p-2">{student.id}</td>
                    <td className="border border-gray-200 p-2">{student.name}</td>
                    <td className="border border-gray-200 p-2">{student.roadmap}</td>
                  </tr>
                ))
              : enrolledStudentsData.slice(0, 20).map((student) => (
                  <tr key={student.id}>
                    <td className="border border-gray-200 p-2">{student.id}</td>
                    <td className="border border-gray-200 p-2">{student.name}</td>
                    <td className="border border-gray-200 p-2">{student.roadmap}</td>
                  </tr>
                ))}
          </tbody>
        </table>

        {enrolledStudentsData.length > 20 && (
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={() => setShowAllStudents(!showAllStudents)}
          >
            {showAllStudents ? 'Show Less' : 'See More'}
          </button>
        )}
      </div>

      {/* Road Maps & Assignments */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Road Maps & Assignments</h3>
        {/* Button to add new road maps and assignments */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
          Add New Road Maps & Assignments
        </button>

        {/* Button to view road maps and assignments */}
        <button
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={() => setShowRoadMapsTable(true)}
        >
          View Road Maps & Assignments
        </button>

        {showRoadMapsTable && (
          <div className="mt-4">
            <table className="w-full border-collapse border border-gray-300">
              {/* Table headers for road maps */}
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
                {roadMapsData.map((roadMap) => (
                  <tr key={roadMap.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4">{roadMap.title}</td>
                    <td className="py-2 px-4">{roadMap.duration}</td>
                    <td className="py-2 px-4">{roadMap.skillsCovered.join(', ')}</td>
                    <td className="py-2 px-4">
                      {roadMap.progressTracking ? 'Yes' : 'No'}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => showRoadMapDetails(roadMap.id)}
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
};

export default ViewMyCompany;
