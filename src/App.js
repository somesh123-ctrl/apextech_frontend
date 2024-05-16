import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddScenarioForm from "./components/AddScenarioForm";
import Sidebar from "./components/Sidebar";
import "./App.css";
import AllScenarios from "./components/AllScenarios";
import AddVehicleForm from "./components/AddVehicleForm";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-scenario" element={<AddScenarioForm />} />
            <Route path="/all-scenarios" element={<AllScenarios />} />
            <Route path="/add-vehicle" element={<AddVehicleForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
