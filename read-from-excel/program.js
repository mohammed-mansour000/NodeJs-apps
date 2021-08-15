var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())

const xlsx = require('xlsx');

var wb = xlsx.readFile('db.xlsx',{ cellDates: true }); 
var wr = wb.Sheets['Sheet 1'];

// var wb2 = xlsx.readFile('db.xlsx',{ cellDates: true }); 
// var wr2 = wb2.Sheets['Transformed by JSON-CSV.CO'];

var data = xlsx.utils.sheet_to_json(wr);

// var data2 = xlsx.utils.sheet_to_json(wr2);

console.log(data)

app.get('/', function (req, res) {

    //res.json([data,data2]);
    res.json(data);
    
})


// start the server listening for requests
app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));

/*  console.log(() =>{
    data.forEach(element => {
        console.log(element.name);
    });
}); */