import React, { useState,useEffect } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";

export const ProjectStatus = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get") // Replace with your server's endpoint
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);
  

  return (
    <div>
      <div className="project-status-container">
        <h1>Project Status</h1>
        <Dashboard
          employeeData={project}
          setEmployeeData={setProject}
        />
      </div>
    </div>
  );
};