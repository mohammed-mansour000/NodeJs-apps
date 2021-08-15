var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())

const xlsx = require('xlsx');

var wb = xlsx.readFile('coffe-details.xlsx',{ cellDates: true }); 
var wr = wb.Sheets['Sheet1'];

var data = xlsx.utils.sheet_to_json(wr);

console.log(data)

app.get('/', function (req, res) {

    res.json(data)
    
})


// start the server listening for requests
app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));

/*  console.log(() =>{
    data.forEach(element => {
        console.log(element.name);
    });
}); */