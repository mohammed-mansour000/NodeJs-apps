const dbOperations = require("./dbOperations");
const Db = require("./dbOperations");
const pool = require('./connection');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('api/', router);


const mysql = require('mysql');

app.get('/broadcasts', function (req, res) {

  pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
    
        // if you got a connection...
        conn.query('select * from broadcast', function(err, rows) {
            if(err) {
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
    
            // for simplicity, just send the rows
            res.send(rows);
    
            // CLOSE THE CONNECTION
            conn.release();
        }
    );


    });

});

app.get('/events', function (req, res) {
    
      pool.getConnection(function (err, conn) {
        if (err)
            return res.send(400);
    
        // if you got a connection...
        conn.query('select * from event', function(err, rows) {
            if(err) {
                conn.release();
                return res.send(400, 'Couldnt get a connection');
            }
    
            // for simplicity, just send the rows
            res.send(rows);
    
            // CLOSE THE CONNECTION
            conn.release();
        }
    );

 });
});

app.get('/projects', function (req, res) {
    
    pool.getConnection(function (err, conn) {
      if (err)
          return res.send(400);
  
      // if you got a connection...
      conn.query('select * from project', function(err, rows) {
          if(err) {
              conn.release();
              return res.send(400, 'Couldnt get a connection');
          }
  
          // for simplicity, just send the rows
          res.send(rows);
  
          // CLOSE THE CONNECTION
          conn.release();
      }
  );

});

});

app.get('/country', function (req, res) {
    
    pool.getConnection(function (err, conn) {
      if (err)
          return res.send(400);
  
      // if you got a connection...
      conn.query('select * from country', function(err, rows) {
          if(err) {
              conn.release();
              return res.send(400, 'Couldnt get a connection');
          }
  
          // for simplicity, just send the rows
          res.send(rows);
  
          // CLOSE THE CONNECTION
          conn.release();
      }
  );

});

});

app.post("/add-project",function(req,res){
    var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
    var table = ["project","title","abstract","description", "country","creationdate","modificationdate","status",req.body.title,req.body.abstract,req.body.description,req.body.country,req.body.creationdate,req.body.modificationdate,req.body.status];
    query = mysql.format(query,table);
    pool.query(query, (err,rows) => {
        if(err) {
            return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }
        res.json({"Error" : false, "Message" : "project Added !"});
    });
});

 app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));