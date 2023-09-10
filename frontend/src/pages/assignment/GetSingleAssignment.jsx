import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function GetSingleAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [assignment,setAssignment] = useState([]);

  const { id, id2 } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/assignment/getSingleByRoadMap/${id}`)
      .then((response) => {
        setAssignments(response.data);
        findAssignment(id2)
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  });
  
  const findAssignment = (id2) => {
    const data = assignments.find((assignment) => assignment._id === id2);
  
    if (data) {
      // Do something with the found assignment
      console.log('Found Assignment:', assignment);
      setAssignment(data)
    } else {
      console.log('Assignment not found');
    }
  };
   
  return (
   
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{assignment.title}</h1>
          <p className="text-gray-500 mb-4">{assignment.description}</p>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-semibold">Deadline:</span>{" "}
              {new Date(assignment.deadline).toLocaleString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Difficulty Level:</span>{" "}
              {assignment.difficultyLevel}
            </div>
            {assignment.skillsRequired &&
              assignment.skillsRequired.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">Skills Required:</span>{" "}
                  {assignment.skillsRequired.join(", ")}
                </div>
              )}
            {assignment.resources &&
              assignment.resources.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">Resources:</span>{" "}
                  <ul>
                    {assignment.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resource {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {assignment.attachments &&
              assignment.attachments.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">Attachments:</span>{" "}
                  <ul>
                    {assignment.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Attachment {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetSingleAssignment;
