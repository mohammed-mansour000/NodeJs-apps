const dbOperations = require("./dbOperations");
const Db = require("./dbOperations");
const order = require("./order");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('api/', router);


app.get('/', function (req, res) {

   res.send("this is defualt api");
    
});

app.get('/orders', function (req, res) {

    dbOperations.getOrders().then(result =>{
        //console.log(res);
        res.json(result[0]);
    });
     
 });

 app.get('/order/:orderId', function (req, res) {

    dbOperations.getOneOrder(req.params.orderId).then(result =>{
        res.json(result[0]);
    });
     
 });


 app.post('/add-order', function (req, res) {

   let order = {...req.body};
   console.log(order);
   dbOperations.addOrder(order).then(result =>{
       console.log(result)
       res.json(result);
   }).catch(err => res.send(err));
    
});

app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));