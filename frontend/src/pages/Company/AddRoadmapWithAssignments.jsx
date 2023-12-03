import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddRoadmapWithAssignments() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignments: [],
  });

  const [assignments, setAssignments] = useState([]);
  const [assignmentToAdd, setAssignmentToAdd] = useState({
    assignmentTitle: '',
    assignmentDescription: '',
  });

  useEffect(() => {
    // Fetch available assignments to choose from
    axios
      .get('http://localhost:1337/assignment/getAll')
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
      });
  }, []);

  const handleAssignmentAdd = () => {
    // Add a new assignment to the roadmap's assignments array
    setFormData({
      ...formData,
      assignments: [
        ...formData.assignments,
        {
          title: assignmentToAdd.assignmentTitle,
          description: assignmentToAdd.assignmentDescription,
        },
      ],
    });

    // Reset the assignment fields
    setAssignmentToAdd({
      assignmentTitle: '',
      assignmentDescription: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to add the roadmap with assignments
    try {
      const response = await axios.post('http://localhost:1337/roadMap/add', formData);
      console.log('Roadmap added:', response.data);

      // Reset the form
      setFormData({
        title: '',
        description: '',
        assignments: [],
      });
    } catch (error) {
      console.error('Error adding roadmap:', error);
    }
  };

  return (
    <div>
      <h2>Add Roadmap with Assignments</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <h3>Add Assignments:</h3>
          <div>
            <label htmlFor="assignmentTitle">Title:</label>
            <input
              type="text"
              id="assignmentTitle"
              name="assignmentTitle"
              value={assignmentToAdd.assignmentTitle}
              onChange={(e) => setAssignmentToAdd({ ...assignmentToAdd, assignmentTitle: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="assignmentDescription">Description:</label>
            <textarea
              id="assignmentDescription"
              name="assignmentDescription"
              value={assignmentToAdd.assignmentDescription}
              onChange={(e) => setAssignmentToAdd({ ...assignmentToAdd, assignmentDescription: e.target.value })}
              required
            />
          </div>
          <button type="button" onClick={handleAssignmentAdd}>
            Add Assignment
          </button>
        </div>
        <ul>
          {formData.assignments.map((assignment, index) => (
            <li key={index}>
              <strong>{assignment.title}:</strong> {assignment.description}
            </li>
          ))}
        </ul>
        <button type="submit">Add Roadmap</button>
      </form>
    </div>
  );
}

export default AddRoadmapWithAssignments;