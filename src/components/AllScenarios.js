import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [editedScenario, setEditedScenario] = useState(null);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get(
        "https://apextech-backend.onrender.com/scenarios"
      );
      setScenarios(response.data);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    }
  };

  const handleDeleteScenario = async (id) => {
    try {
      await axios.delete(
        `https://apextech-backend.onrender.com/scenarios/${id}`
      );
      fetchScenarios();
    } catch (error) {
      console.error("Error deleting scenario:", error);
    }
  };

  const handleEditScenario = (scenario) => {
    setEditedScenario(scenario);
  };

  const handleUpdateScenario = async () => {
    try {
      await axios.put(
        `https://apextech-backend.onrender.com/scenarios/${editedScenario.id}`,
        editedScenario
      );
      fetchScenarios();
      setEditedScenario(null);
    } catch (error) {
      console.error("Error updating scenario:", error);
    }
  };

  return (
    <div className="scenarios-container">
      <h2>All Scenarios</h2>
      <Link to="/add-scenario">
        <button>New Scenario</button>
      </Link>
      <Link to="/add-vehicle">
        <button>Add Vehicle</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Scenario Id</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number Of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time} seconds</td>
              <td>{scenario.vehicles.length}</td>
              <td>
                <Link to="/add-vehicle">
                  <button>Add Vehicle</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleEditScenario(scenario)}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteScenario(scenario.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedScenario && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditedScenario(null)}>
              &times;
            </span>
            <h2>Edit Scenario</h2>
            <label>Scenario Name:</label>
            <input
              type="text"
              value={editedScenario.name}
              onChange={(e) =>
                setEditedScenario({ ...editedScenario, name: e.target.value })
              }
            />
            <label>Scenario Time (seconds):</label>
            <input
              type="number"
              value={editedScenario.time}
              onChange={(e) =>
                setEditedScenario({ ...editedScenario, time: e.target.value })
              }
            />
            <button onClick={handleUpdateScenario}>Update Scenario</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllScenarios;
