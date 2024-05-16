import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddVehicle.css";

const AddVehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    initialPositionX: "",
    initialPositionY: "",
    speed: "",
    direction: "Towards",
    selectedScenario: "",
  });
  const [scenarios, setScenarios] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name.includes("initialPosition")
      ? Math.min(parseInt(value), 380)
      : value;
    setVehicleData({ ...vehicleData, [name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apextech-backend.onrender.com/vehicles",
        vehicleData
      );
      console.log("Vehicle added successfully:", response.data);

      setVehicleData({
        vehicleName: "",
        initialPositionX: "",
        initialPositionY: "",
        speed: "",
        direction: "Towards",
        selectedScenario: "",
      });
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Scenario:
          <select
            name="selectedScenario"
            value={vehicleData.selectedScenario}
            onChange={handleChange}
          >
            <option value="">Select Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Vehicle Name:
          <input
            type="text"
            name="vehicleName"
            value={vehicleData.vehicleName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Initial Position X:
          <input
            type="number"
            name="initialPositionX"
            value={vehicleData.initialPositionX}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Initial Position Y:
          <input
            type="number"
            name="initialPositionY"
            value={vehicleData.initialPositionY}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            name="speed"
            value={vehicleData.speed}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Direction:
          <select
            name="direction"
            value={vehicleData.direction}
            onChange={handleChange}
          >
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </label>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicleForm;
