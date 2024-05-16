import React, { useState } from "react";
import axios from "axios";
import "../css/AddScenario.css";
const AddScenarioForm = () => {
  const [scenario, setScenario] = useState({
    name: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenario({
      ...scenario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://apextech-backend.onrender.com/scenarios",
        scenario
      );
      console.log("Scenario added successfully:", scenario);
      setScenario({
        name: "",
        time: "",
      });
    } catch (error) {
      console.error("Error adding scenario:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Scenario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Scenario Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={scenario.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <select
            id="time"
            name="time"
            onChange={handleChange}
            value={scenario.time}
            required
          >
            <option value="">Select Time</option>
            <option value="5">5 seconds</option>
            <option value="10">10 seconds</option>
            <option value="15">15 seconds</option>
          </select>
        </div>
        <button type="submit">Add Scenario</button>
      </form>
    </div>
  );
};

export default AddScenarioForm;
