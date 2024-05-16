import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/HomePage.css";

const Homepage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [simulationInterval, setSimulationInterval] = useState(null);

  const containerWidth = 800;
  const containerHeight = 400;

  useEffect(() => {
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
    fetchScenarios();
  }, []);

  const handleScenarioSelect = async (event) => {
    const scenarioId = event.target.value;
    const selected = scenarios.find(
      (scenario) => scenario.id === parseInt(scenarioId)
    );
    setSelectedScenario(selected);

    try {
      const response = await axios.get(
        `https://apextech-backend.onrender.com/scenarios/${selected.id}/vehicles`
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const startSimulation = () => {
    if (selectedScenario) {
      const interval = setInterval(() => {
        moveAllVehicles();
      }, selectedScenario.time);
      setSimulationInterval(interval);
    }
  };

  const moveAllVehicles = () => {
    setVehicles((prevVehicles) => {
      return prevVehicles.map((vehicle, index) => {
        let newX = vehicle.initialPositionX;
        let newY = vehicle.initialPositionY;

        switch (vehicle.direction) {
          case "Towards":
            newX += vehicle.speed;
            break;
          case "Backwards":
            newX -= vehicle.speed;
            break;
          case "Upwards":
            newY -= vehicle.speed;
            break;
          case "Downwards":
            newY += vehicle.speed;
            break;
          default:
            break;
        }

        if (
          newX < 0 ||
          newX > containerWidth ||
          newY < 0 ||
          newY > containerHeight
        ) {
          return { ...vehicle, visible: false };
        }

        return { ...vehicle, initialPositionX: newX, initialPositionY: newY };
      });
    });
  };

  const stopSimulation = () => {
    clearInterval(simulationInterval);
  };

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="homepage">
      <div className="left-section">
        <div className="scenario-dropdown">
          <h2>Select Scenario:</h2>
          <select className="scenario-select" onChange={handleScenarioSelect}>
            <option value="">Select Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>

        <div className="container">
          <div className="vehicles-table">
            <h2>Vehicles Details</h2>
            {selectedScenario && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Initial Position X</th>
                    <th>Initial Position Y</th>
                    <th>Speed</th>
                    <th>Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, index) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.vehicleName}</td>
                      <td>{vehicle.initialPositionX}</td>
                      <td>{vehicle.initialPositionY}</td>
                      <td>{vehicle.speed}</td>
                      <td>{vehicle.direction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!selectedScenario && (
              <p className="no-scenario-message">Please select a scenario</p>
            )}
          </div>
        </div>
      </div>

      <div className="right-section">
        <svg
          className="svg-container"
          width={containerWidth}
          height={containerHeight}
        >
          <rect
            width={containerWidth}
            height={containerHeight}
            style={{ fill: "lightblue", stroke: "black" }}
          />

          {vehicles.map((vehicle, index) => (
            <circle
              key={vehicle.id}
              cx={vehicle.initialPositionX}
              cy={vehicle.initialPositionY}
              r="10"
              style={{ fill: getRandomColor() }}
            />
          ))}
        </svg>
      </div>

      <div className="simulation-controls">
        <button onClick={startSimulation}>Start Simulation</button>
        <button onClick={stopSimulation}>Stop Simulation</button>
      </div>
    </div>
  );
};

export default Homepage;
