import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function GetSingleRoadMap() {
  const [roadmap, setRoadmap] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [showAssignments, setShowAssignments] = useState(false);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch a single roadmap's details from the backend based on the ID
    axios
      .get(`http://localhost:1337/roadmap/getSingle/${id}`)
      .then((response) => {
        setRoadmap(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roadmap details:", error);
      });
  }, [id]);

  const fetchAssignments = () => {
    axios
      .get(`http://localhost:1337/assignment/getSingleByRoadMap/${id}`)
      .then((response) => {
        setAssignments(response.data);
        setShowAssignments(true);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  };

  const showRoadMapDetails = (id2) => {
    navigate(`/assignment/getOne/${id}/${id2}`);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{roadmap.title}</h1>
          <br/>
          <p className="text-gray-500 mb-4">{roadmap.description}</p>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2 px-20 py-40">
            <div className="mb-2">
              <span className="font-semibold">Duration:</span> {roadmap.duration}
            </div>
            {roadmap.skillsCovered && roadmap.skillsCovered.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Skills Covered:</span>{" "}
                {roadmap.skillsCovered.join(", ")}
              </div>
            )}
            {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Prerequisites:</span>{" "}
                {roadmap.prerequisites.join(", ")}
              </div>
            )}
            <div className="mb-2">
              <span className="font-semibold">Goals and Objectives:</span>{" "}
              {roadmap.goalsObjectives}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Progress Tracking:</span>{" "}
              {roadmap.progressTracking ? "Yes" : "No"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Additional Notes:</span>{" "}
              {roadmap.additionalNotes}
            </div>
            <button
              onClick={() => fetchAssignments()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
            >
              Show Assignments
            </button>
            <br/>
            <button
              onClick={() => fetchAssignments()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
            >
              Enroll this roadmap
            </button>
          </div>
          <div className="w-1/2 p-4">
            {/* Add an image element with the image source */}
            <img
              src="/images/roadmap.png" // Replace with the actual image source
              alt="Roadmap Image"
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
        {showAssignments && (
          <div>
            <h2 className="text-xl font-semibold mt-4">Assignments</h2>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Difficulty Level</th>
                  <th>Skills Required</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                  <td className="text-center">{assignment.title}</td>
                  <td className="text-center">{assignment.description}</td>
                  <td className="text-center">{assignment.difficultyLevel}</td>
                  <td className="text-center">{assignment.skillsRequired.join(", ")}</td>
                  <td className="text-center">
                    <button
                      onClick={() => showRoadMapDetails(assignment._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      View
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

export default GetSingleRoadMap;
