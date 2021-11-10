import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/" className="btn btn-success">
        Home
      </Link>
    </div>
  );
};

export default Dashboard;
