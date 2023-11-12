const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
 

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "635103", // Update with your actual MySQL password
  database: "ucms"
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/get", (req, res) => {
//   const sqlGet = "SELECT * FROM USERS";
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });

// app.post("/api/post", (req, res) => {
//   const { userName, password, email } = req.body;
//   const sqlInsert = "INSERT INTO USERS (username, password, email) VALUES(?,?,?)";
//   db.query(sqlInsert, [userName, password, email], (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: "An error occurred while saving data" });
//     } else {
//       res.status(200).json({ status: "success" });
//     }
//   });
// }); 

// app.delete("/api/remove/:id", (req,res) => {
//     const {id} = req.params; 
//     const sqlRemove = "DELETE FROM USERS WHERE id = ?"; 
//     db.query(sqlRemove, id, (error, result) => {
//         if(error){
//             console.log(error); 
//         }
//     }); 
// });  

// app.get("/api/get/:id", (req,res) => {
//   const {id} = req.params; 
//   const sqlGet = "SELECT * FROM USERS where id = ?"; 
//   db.query(sqlGet, id, (error, result) => {
//     if(error){
//       console.log(error); 
//     } 
//     res.send(result); 
//   }); 
// }); 

// app.put("/api/update/:id", (req,res) => {
//   const {id} = req.params;  
//   const {userName, password, email} = req.body; 
//   const sqlUpdate = "UPDATE USERS SET userName = ?, password = ?, email = ? WHERE id = ?"; 
//   db.query(sqlUpdate, [userName, password, email, id], (error, result) => {
//     if(error){
//       console.log(error); 
//     } 
//     res.send(result); 
//   }); 
// });  

// ------------------------------------------------------------------------------------------------------------

// CREATE
// new club  

app.post("/api/add-club", (req, res) => {
  const { clubName, description, socMed, email } = req.body;
  const sqlInsert = "INSERT INTO CLUBS (clubName, description, socMed, email) VALUES(?,?,?,?)";
  db.query(sqlInsert, [clubName, description, socMed, email], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});  

// new student 
app.post("/api/add-student", (req, res) => {
  const { srn, name, phone_number, email, dob, department } = req.body;
  const sqlInsert = "INSERT INTO STUDENTS (srn, name, phone_number, email, dob, department) VALUES(?,?,?,?,?,?)";
  db.query(sqlInsert, [srn, name, phone_number, email, dob, department], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
}); 

// new faculty 
app.post("/api/add-faculty", (req, res) => {
  const { faculty_name, email, phone_no, department, club_Id } = req.body;
  const sqlInsert = "INSERT INTO FACULTY (faculty_name, email, phone_no, department, clubId) VALUES(?,?,?,?,?)";
  db.query(sqlInsert, [faculty_name, email, phone_no, department, club_Id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});  

// membership 
app.post("/api/add-membership", (req, res) => {
  const { srn, club_Id, role, domain } = req.body;
  const sqlInsert = "INSERT INTO STUDENTCLUBS (srn, clubId, role, domain) VALUES(?,?,?,?)";
  db.query(sqlInsert, [srn, club_Id, role, domain], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});

//--------------------------------------------------------------------------------------------------------------------- 

// READ   
//getting details from clubs table 
app.get("/api/get-club", (req, res) => {
  const sqlGet = "SELECT * FROM CLUBS";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//getting details from students table 
app.get("/api/get-student", (req, res) => {
  const sqlGet = "SELECT * FROM STUDENTS";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//getting details from faculty table 
app.get("/api/get-faculty", (req, res) => {
  const sqlGet = "SELECT FACULTY.faculty_id, FACULTY.faculty_name, FACULTY.email, FACULTY.phone_no, FACULTY.department, CLUBS.clubId, CLUBS.clubName FROM FACULTY INNER JOIN CLUBS ON FACULTY.clubId = CLUBS.clubId";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//getting details from studentclubs table 
app.get("/api/get-studentclubs", (req, res) => {
  const sqlGet = "SELECT SC.srn, S.name, SC.clubId, C.clubName, SC.role, SC.domain FROM STUDENTCLUBS SC INNER JOIN STUDENTS S ON SC.srn = S.srn INNER JOIN CLUBS C ON SC.clubId = C.clubId";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
}); 

//-----------------------------------------------------------------------------------------------------------------------

// UPDATE 
// updating clubs table
app.put("/api/update-club/:id", (req,res) => {
  const {id} = req.params;  
  const { clubName, description, socMed, email } = req.body; 
  const sqlUpdate = "UPDATE CLUBS SET clubName = ?, description = ?, socMed = ?, email = ? WHERE clubId = ?"; 
  db.query(sqlUpdate, [clubName, description, socMed, email, id], (error, result) => {
    if(error){
      console.log(error); 
    } 
    res.send(result); 
  }); 
}); 

// updating students table 
app.put("/api/update-student/:srn", (req, res) => {
  const { srn, name, phone_number, email, dob, department } = req.body;
  const sqlInsert = "UPDATE STUDENTS SET srn = ?, name = ?, phone_number = ?, email = ?, dob = ?, department = ? WHERE srn = ?";
  db.query(sqlInsert, [srn, name, phone_number, email, dob, department, srn], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});  

// updating faculty table 
app.put("/api/update-faculty/:id", (req, res) => {
  const {id} = req.params;
  const { faculty_name, email, phone_no, department, club_Id } = req.body;
  const sqlInsert = "UPDATE FACULTY SET faculty_name = ?, email = ?, phone_no = ?, department = ?, clubId = ? WHERE faculty_id = ?";
  db.query(sqlInsert, [faculty_name, email, phone_no, department, club_Id, id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
}); 

// updating studentClubs table 
app.put("/api/update-membership/:id", (req,res) => {
  const {id} = req.params; 
  const { srn, club_Id, role, domain } = req.body;
  const sqlInsert = "UPDATE STUDENTCLUBS SET srn = ?, clubId = ?, role = ?, domain = ? WHERE clubId = ?";
  db.query(sqlInsert, [srn, club_Id, role, domain, id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    } else {
      res.status(200).json({ status: "success" });
    }
  });
});

//--------------------------------------------------------------------------------------------------------

// DELETE 
// deleting record from clubs table 

app.delete("/api/remove-club/:id", (req,res) => {
  const {id} = req.params; 
  const sqlRemove = "DELETE FROM CLUBS WHERE clubId = ?"; 
  db.query(sqlRemove, id, (error, result) => {
      if(error){
          console.log(error); 
      }
  }); 
}); 

// deleting record from students table 
app.delete("/api/remove-student/:id", (req,res) => {
  const {id} = req.params; 
  const sqlRemove = "DELETE FROM STUDENTS WHERE srn = ?"; 
  db.query(sqlRemove, id, (error, result) => {
      if(error){
          console.log(error); 
      }
  }); 
});  

// deleting record from faculty table 
app.delete("/api/remove-faculty/:id", (req,res) => {
  const {id} = req.params; 
  const sqlRemove = "DELETE FROM FACULTY WHERE faculty_id = ?"; 
  db.query(sqlRemove, id, (error, result) => {
      if(error){
          console.log(error); 
      }
  }); 
});  

// removing membership
app.delete("/api/remove-membership/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM STUDENTCLUBS WHERE clubId = ?";
  db.query(sqlRemove, id, (error, result) => {
      if (error) {
          console.log(error);
          res.status(500).json({ error: "An error occurred while deleting the membership" });
      } else {
          res.status(200).json({ status: "success" });
      }
  });
});


//---------------------------------------------------------------------------------------------------


//Query Execution

app.post("/api/execute-query-by-index", (req, res) => {
  const { queryIndex } = req.body;
  console.log("Received query index:", queryIndex);

  // Check if the index is valid
  if (queryIndex >=0 && queryIndex < 7)
  {
    let queryToExecute;

    
    switch (queryIndex) {
      case 0:
        queryToExecute = "SELECT  clubName,socMed from clubs";
        break;
      case 1:
        queryToExecute = "SELECT faculty_name,phone_no FROM faculty where faculty_id = 1";
        break;
      case 2:
        queryToExecute = "SELECT srn, name FROM students WHERE srn IN (SELECT srn FROM studentclubs GROUP BY srn HAVING COUNT(DISTINCT clubId) > 1)";
        break;
      case 3:
        queryToExecute = "SELECT srn, name FROM students WHERE srn IN (SELECT srn FROM studentclubs WHERE role = 'President/ Club Head' AND srn = students.srn)";
        break;
      case 4:
        queryToExecute = "SELECT c.clubName FROM clubs c WHERE EXISTS (SELECT 1 FROM studentclubs sc1 JOIN students s ON sc1.srn = s.srn WHERE sc1.clubId = c.clubId GROUP BY s.srn HAVING COUNT(DISTINCT s.domain) > 1);" 
        break;
      case 5:
        queryToExecute = "CALL GetClubMemberCount(1)"
        break;

      default:
        // Handle unexpected indexes
        console.error("Invalid query index.");
        return res.status(400).json({ error: "Invalid query index." });
    }

    // Execute the SELECT query
    db.query(queryToExecute, (error, result) => 
    {
      if (error) 
      {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "An error occurred while executing the query" });
      } else 
      {
        console.log("Query execution completed.");
        res.status(200).json({ result });
      }
    });

  } 
  else 
  {
    console.error("Invalid query index.");
    res.status(400).json({ error: "Invalid query index." });
  }
});



//---------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Server side");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
