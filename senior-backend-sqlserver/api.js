const dbOperations = require("./dbOperations");
const Db = require("./dbOperations");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('api/', router);


app.get('/broadcasts', function (req, res) {

    dbOperations.getBroadcasts().then(result =>{
        //console.log(res);
        res.json(result[0]);
    });
     
 });


app.get('/events', function (req, res) {

    dbOperations.getEvents().then(result =>{
        //console.log(res);
        res.json(result[0]);
    });
     
 });


 app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));