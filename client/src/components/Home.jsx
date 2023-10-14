import React, { useEffect, useState } from "react";
import "./nav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const loadData = async () => {
    const responses = await axios.get("http://localhost:5000/api/get");
    setData(responses.data);
  };

  useEffect(() => {
    loadData();
  }, [data]);

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete the contact?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact deleted successfully");
    }
  };
  const updateItem = (id) => {
    // Navigate to the "addtask" route with the id as a query parameter
    navigate(`/addtask?id=${id}`);
  };
  

  return (
    <>
      <header style={{marginTop:"-145px"}}>
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
          <a
            style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            href="/login"
          >
            Logout
          </a>
        </ul>
      </header>
      <div style={{ marginTop: "150px", marginLeft: "300px" }} className="App">
        

        {data.map((item, index) => (
          <div key={index} className="box">
        
              <div className="status">
                <div className="label">
                  Status : {item.status}
                </div>
            </div>
            <br />
            <div className="project">
              <div className="tot1">
                <div className="label">Project : {item.project}</div>
                <div style={{ fontWeight: "bold" }}>Completed</div>{" "}
              </div>
            </div>
            <div className="leader">
              <div className="value">
                <div className="label">
                  Project Leader : {item.project_leader}
                </div>
                <div>{item.percentage1}%</div>
              </div>
            </div>
            <div className="team-members">
              <div className="member">
                {/* <div className="label">Team Member 1:</div> */}
                <div className="value">
                  <div>{item.member1}</div> {item.percentage2}%
                </div>
              </div>
              <br />
              <div className="member">
                {/* <div className="label">Team Member 2:</div> */}
                <div className="value">
                  <div> {item.member2} </div> {item.percentage3}%
                </div>
              </div>
              <br />
              <div className="member">
                {/* <div className="label">Team Member 3:</div> */}
                <div className="value">
                  <div> {item.member3} </div> {item.percentage4}%
                </div>
              </div>
            </div>
            <div>
              <div style={{display:'flex',gap:'60px',justifyContent:'center'}}>
              <button style={{}} onClick={() => deleteItem(item.id)} >Delete</button>
              <button  onClick={() => updateItem(item.id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
