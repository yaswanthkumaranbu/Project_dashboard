import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./addTask.css";

// import './App.css'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./nav.css";

function AddTask() {
  const [temp, settemp] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var Id = queryParams.get("id");
  useEffect(() => {
    if (Id !== null && Id !== undefined) {
      axios
        .get(`http://localhost:5000/api/get/${Id}`)
        .then((resp) => {
          console.log("Response data:", resp.data);
          setState({ ...resp.data[0] });
          // console.log(selectedValue)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [Id]);

  const initialState = {
    project: "",
    selectedValue: "Pending",
    project_leader: "",
    percentage1: 0,
    member1: "",
    percentage2: 0,
    member2: "",
    percentage3: 0,
    member3: "",
    percentage4: 0,
  };
  const [selectedValue, setSelectedValue] = useState("Pending");
  const [state, setState] = useState(initialState);

  const {
    id,
    project,
    project_leader,
    percentage1,
    member1,
    percentage2,
    member2,
    percentage3,
    member3,
    percentage4,
  } = state;
  // console.log(selectedValue)
  const handleSubmit = () => {
    // if(!project){
    //   alert("Enter the values please!")
    // }
    // else{
    if (!Id) {
      axios.post("http://localhost:5000/api/post", {
        id,
        project,
        selectedValue,
        project_leader,
        percentage1,
        member1,
        percentage2,
        member2,
        percentage3,
        member3,
        percentage4,
      });
      console.log(project, selectedValue);
      alert("Added successfully!");
      setState(initialState);
      settemp(temp + 1);
    } else {
      axios
        .put(`http://localhost:5000/api/put`, {
          id,
          project,
          selectedValue,
          project_leader,
          percentage1,
          member1,
          percentage2,
          member2,
          percentage3,
          member3,
          percentage4,
        })
        .then(() => {
          setState(initialState);
        });
      alert("Updated suceessfully");
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    // setSelectedValue(e.target.value);

    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  const handleOptionChange = (e) => {
    setSelectedValue(e.target.value);

    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  // console.log(state);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/home" id="home-link">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/dashboard" id="restaurant-link">
                Dashboard
              </a>
            </li> */}
            <li>
              <a href="addtask" id="order-link">
                Add Project
              </a>
            </li>
          </ul>
        </nav>

        <ul>
          <a href="/login">Logout</a>
        </ul>
      </header>
      <div style={{ marginTop: "150px", marginLeft: "300px" }} className="App">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="hidden" name="id" value={temp} />
          <br />
          <br />

          <label>Project </label>
          <input
            name="project"
            value={project || ""}
            type="text"
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Status</label>

          <select
            name="selectedValue"
            value={selectedValue || ""}
            onChange={handleOptionChange}
          >
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <br />
          <label>Project leader </label>
          <input
            name="project_leader"
            value={project_leader || ""}
            type="text"
            onChange={handleChange}
            placeholder="ex:kumar(Fullstack)"
          />
          <label> percentage </label>
          <input
            name="percentage1"
            value={percentage1 || ""}
            type="text"
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Team member 1 </label>
          <input
            name="member1"
            value={member1 || ""}
            type="text"
            onChange={handleChange}
            placeholder="ex:kumar(figma)"
          />

          <label> percentage </label>
          <input
            name="percentage2"
            value={percentage2 || ""}
            type="text"
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Team member 2 </label>
          <input
            name="member2"
            value={member2 || ""}
            type="text"
            onChange={handleChange}
            placeholder="ex:kumar(Front-end)"
          />

          <label> percentage </label>
          <input
            name="percentage3"
            value={percentage3 || ""}
            type="text"
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Team member 3 </label>
          <input
            name="member3"
            value={member3 || ""}
            type="text"
            onChange={handleChange}
            placeholder="ex:kumar(Back-end)"
          />

          <label> percentage </label>
          <input
            name="percentage4"
            value={percentage4 || ""}
            type="text"
            onChange={handleChange}
          />
          <br />
          <br />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {" "}
            <input type="submit" value={Id ? "Update" : "Save"} />
            <input
              type="submit"
              onClick={() => navigate("/home")}
              value={"View"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTask;
