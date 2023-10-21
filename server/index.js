const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Update with your actual MySQL password
  database: "ucms"
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM USERS";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { userName, password, email } = req.body;
  const sqlInsert = "INSERT INTO USERS (username, password, email) VALUES(?,?,?)";
  db.query(sqlInsert, [userName, password, email], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
}); 

app.delete("/api/remove/:id", (req,res) => {
    const {id} = req.params; 
    const sqlRemove = "DELETE FROM USERS WHERE id = ?"; 
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error); 
        }
    }); 
});  

app.get("/api/get/:id", (req,res) => {
  const {id} = req.params; 
  const sqlGet = "SELECT * FROM USERS where id = ?"; 
  db.query(sqlGet, id, (error, result) => {
    if(error){
      console.log(error); 
    } 
    res.send(result); 
  }); 
}); 

app.put("/api/update/:id", (req,res) => {
  const {id} = req.params;  
  const {userName, password, email} = req.body; 
  const sqlUpdate = "UPDATE USERS SET userName = ?, password = ?, email = ? WHERE id = ?"; 
  db.query(sqlUpdate, [userName, password, email, id], (error, result) => {
    if(error){
      console.log(error); 
    } 
    res.send(result); 
  }); 
}); 

app.get("/", (req, res) => {
  res.send("Server side");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
