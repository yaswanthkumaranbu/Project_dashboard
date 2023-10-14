const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_management",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  console.log("getted")
  const sqlGet = "select * from projects";
  db.query(sqlGet, (err, result) => {
    // if(err)
    //  { console.log(err)
    // return}
    res.send(result);
  });
});

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;

  const sqlGet = "select * from projects where id=?";
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/api/put", (req, res) => {
  const {    id,
    project,
    selectedValue,
    project_leader,
    percentage1,
    member1,
    percentage2,
    member2,
    percentage3,
    member3,
    percentage4 } = req.body;
  const sqlPut =
    "Update projects set id=?,project=?,status=?,project_leader=? ,percentage1=? ,member1=?,percentage2=? ,member2=? ,percentage3=?,member3=? ,percentage4=? where id=?";
  db.query(sqlPut, [    id,
    project,
    selectedValue,
    project_leader,
    percentage1,
    member1,
    percentage2,
    member2,
    percentage3,
    member3,
    percentage4, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});


app.post("/api/post", (req, res) => {
  const {  id,     project,
    selectedValue,
    project_leader,
    percentage1,
    member1,
    percentage2,
    member2,
    percentage3,
    member3,
    percentage4, } = req.body;
  const sqlInsert =
    "insert into projects (id,project,status,project_leader ,percentage1 ,member1,percentage2 ,member2 ,percentage3,member3 ,percentage4) values(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [id,project,
    selectedValue,
    project_leader,
    percentage1,
    member1,
    percentage2,
    member2,
    percentage3,
    member3,
    percentage4,], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "delete from projects where id=?";
  db.query(sqlDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
