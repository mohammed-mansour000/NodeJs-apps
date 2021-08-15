var express = require('express')
var cors = require('cors')
var app = express()
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



var Excel = require('exceljs')
var workbook = new Excel.Workbook()

app.use(cors())
app.use(express.json())

users = [
  {name: 'rana', adress: 'fnaydek'}
]

app.get('/', function (req, res) {
  res.json(users)
})



  app.post('/user', function (req, res) {
  let response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

 

  //convert the response in JSON format
  workbook.xlsx.readFile('test.xlsx')
    .then(function(){
      var worksheet = workbook.getWorksheet("Sheet4")
      var row =[
        [response.first_name, response.last_name],
      ]


      worksheet.addRows(row)
        return  workbook.xlsx.writeFile('test.xlsx')
    })
  res.end(JSON.stringify(response));
});

app.listen(3000)