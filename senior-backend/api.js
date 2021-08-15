const dbOperations = require("./dbOperations");
const Db = require("./dbOperations");
const pool = require("./connection");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("api/", router);

const mysql = require('mysql');

//get broadcasts data
app.get("/broadcasts", function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) return res.send(400);

    // if you got a connection...
    conn.query("select * from broadcast", function (err, rows) {
      if (err) {
        conn.release();
        return res.send(400, "Couldnt get a connection");
      }

      // for simplicity, just send the rows
      res.send(rows);

      // CLOSE THE CONNECTION
      conn.release();
    });
  });
});

//get events data
app.get("/events", function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) return res.send(400);

    // if you got a connection...
    conn.query("select * from event", function (err, rows) {
      if (err) {
        conn.release();
        return res.send(400, "Couldnt get a connection");
      }

      // for simplicity, just send the rows
      res.send(rows);

      // CLOSE THE CONNECTION
      conn.release();
    });
  });
});

//get all privilige data
app.get("/privileges", function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) return res.send(400);

    // if you got a connection...
    conn.query("select * from privilege", function (err, rows) {
      if (err) {
        conn.release();
        return res.send(400, "Couldnt get a connection");
      }

      // for simplicity, just send the rows
      res.send(rows);

      // CLOSE THE CONNECTION
      conn.release();
    });
  });
});

//post a privilege
app.post("/add-privilege",function(req,res){
    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = ["privilege","code","description",req.body.code,req.body.description];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "privilege Added !"});
    });
});

//delete a privilege on specific id
app.delete("/delete-privilege/:privilegeId",function(req,res){
    var query = "delete from ?? WHERE id = ?";
    var table = ["privilege",req.params.privilegeId];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "privilege Deleted !"});
    });
});


//get one privilige based on id
app.get("/privilege/:privilegeId", function (req, res) {
    pool.getConnection(function (err, conn) {
      if (err) return res.send(400);
  
      // if you got a connection...
      conn.query("select * from privilege WHERE id = " + req.params.privilegeId , function (err, rows) {
        if (err) {
          conn.release();
          return res.send(400, "Couldnt get a connection");
        }
  
        // for simplicity, just send the rows
        res.send(rows);
  
        // CLOSE THE CONNECTION
        conn.release();
      });
    });
  });

//post a privilege
app.put("/edit-privilege/:id",function(req,res){
    var query = "UPDATE  ?? SET code = ? , description = ? WHERE id = ?";
    var table = ["privilege",req.body.code,req.body.description, req.params.id];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query", "err": err});
        }
        res.json({"Error" : false, "Message" : "privilege Updated !", "rows": req.body });
    });
});


//get all userrole data
app.get("/roles", function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) return res.send(400);
    
    let query= "SELECT userrole.*, json_arrayagg( json_object( 'id', privilege.id, 'code', privilege.code, 'description', privilege.code ) ) privileges FROM userrole INNER JOIN roleprivilege ON userrole.id = roleprivilege.userrole_id INNER JOIN privilege ON privilege.id = roleprivilege.privilege_id group by userrole.id, userrole.title";
    // if you got a connection...
    conn.query(query, function (err, rows) {
      if (err) {
        conn.release();
        return res.send(400, "Couldnt get a connection");
      }

      // for simplicity, just send the rows
      //res.setHeader('Content-Type', 'application/json');
      res.send(rows);

      // CLOSE THE CONNECTION
      conn.release();
    });
  });
});


//post a role and insert its id and the privileges id inside roleprivilege table
app.post("/add-role",function(req,res){
  var query = "INSERT INTO ??(??,??) VALUES (?,?);SELECT LAST_INSERT_ID();";
  var table = ["userrole","title","description",req.body.title,req.body.description];
  query = mysql.format(query,table);
  pool.query(query, (err,rows) => {
      if(err) {
          return res.json({"Error" : true, "Message" : "Error executing MySQL first query"});
      }else{
       var lastInsertedId = rows[0].insertId;
       var query2 = "";
       req.body.privileges.forEach(element => {
        query2 += `insert into roleprivilege(userrole_id, privilege_id) values(${lastInsertedId}, ${element.id});`
      });
       pool.query(query2, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL second query"});
        }else{
          res.json({"Error" : false, "Message" : "role Added !"});
        }
       
      });
    }
     
  });
});


//delete a role on specific id
app.delete("/delete-role/:roleId",function(req,res){
  var query = "delete from ?? WHERE id = ?";
  var table = ["userrole",req.params.roleId];
  query = mysql.format(query,table);
  pool.query(query, (err,rows) => {
      if(err) {
          return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      }
      res.json({"Error" : false, "Message" : "role Deleted !"});
  });
});

//get one role based on id
app.get("/role/:roleId", function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) return res.send(400);

    //prepare the query
    var query = `SELECT userrole.*, json_arrayagg( json_object( 'id', privilege.id, 'code', privilege.code, 'description', privilege.code ) ) 'privileges' FROM userrole INNER JOIN roleprivilege ON userrole.id = roleprivilege.userrole_id INNER JOIN privilege ON privilege.id = roleprivilege.privilege_id WHERE userrole.id = ${req.params.roleId} group by userrole.id, userrole.title`; 
    // if you got a connection...
    conn.query(query , function (err, rows) {
      if (err) {
        conn.release();
        return res.send(400, "Couldnt get a connection");
      }

      // for simplicity, just send the rows
      res.send(rows);

      // CLOSE THE CONNECTION
      conn.release();
    });
  });
});


//edit a role
//post a role and insert its id and the privileges id inside roleprivilege table
// app.put("/edit-role",function(req,res){
//   var query = "UPDATE  ?? SET title = ? , description = ? WHERE id = ?";
//   var table = ["userrole",req.body.title,req.body.description, req.body.id];
//   query = mysql.format(query,table);
//   pool.query(query, (err,rows) => {
//       if(err) {
//           return res.json({"Error" : true, "Message" : "Error executing MySQL first query", "err":err});
//       }else{
//        var query2 = `select id from roleprivilege where userrole_id=${req.body.id}`;
//       //  req.body.privileges.forEach(element => {
//       //   query2 += `UPDATE roleprivilege SET userrole_id = ${req.params.id}, privilege_id = ${element.id}  WHERE userrole_id = ${req.params.id} ;`
//       //   });
//        pool.query(query2, (err,rows) => {
//         if(err) {
//             return res.json({"Error" : true, "Message" : "Error executing MySQL second query"});
//         }else{
//           //res.json({"Error" : false, "Message" : "role Updated !"});
//           var id_array = rows;
//           var query3 = "";
//           req.body.privileges.forEach(element => {
//             id_array.forEach(e =>{
//               query3 += `UPDATE roleprivilege SET privilege_id = ${element.id}  WHERE id = ${e.id} ;`
//             });
//           });
//           pool.query(query2, (err,rows) => {
//             if(err) {
//                 return res.json({"Error" : true, "Message" : "Error executing MySQL third query"});
//             }else{
//               res.json({"Error" : false, "Message" : "role Updated !"});
//             }
          
//           });
//         }
       
//       });
//      }
     
//   });
// });
app.put("/edit-role",function(req,res){
    var query = "UPDATE  ?? SET title = ? , description = ? WHERE id = ?";
    var table = ["userrole",req.body.title,req.body.description, req.body.id];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL first query", "err":err});
        }else{
         //var query2 = `select id from roleprivilege where userrole_id=${req.body.id}`;
        //  req.body.privileges.forEach(element => {
        //   query2 += `UPDATE roleprivilege SET userrole_id = ${req.params.id}, privilege_id = ${element.id}  WHERE userrole_id = ${req.params.id} ;`
        //   });
          res.json({"Error" : false, "Message" : "role Updated !"});
       }
       
    });
  });


app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
