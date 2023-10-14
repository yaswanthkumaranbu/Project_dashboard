import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import React from "react";
import AddTask from "./components/addTask";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/addtask/:id" element={<AddTask />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
