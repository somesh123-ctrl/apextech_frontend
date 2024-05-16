import React from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Navigation</div>
      <ul className="sidebar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-scenario">Add Scenario</Link>
        </li>
        <li>
          <Link to="/all-scenarios">All Scenarios</Link>
        </li>
        <li>
          <Link to="/add-vehicle">Add Vehicle</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
