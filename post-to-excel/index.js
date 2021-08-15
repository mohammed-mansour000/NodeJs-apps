// // Requiring module 
// const reader = require('xlsx') 
  
// // Reading our test file 
// const file = reader.readFile('output.xlsx') 
  
// // Sample data set 
// let student_data = [{ 
//     Student:'Nikhil', 
//     Age:22, 
//     Branch:'ISE', 
//     Marks: 70 
// }, 
// { 
//     Name:'Amitha', 
//     Age:21, 
//     Branch:'EC', 
//     Marks:80 
// }] 
  
// const ws = reader.utils.json_to_sheet(student_data) 
  
// reader.utils.book_append_sheet(file,ws,"Sheet3") 
  
// // Writing to our file 
// reader.writeFile(file,'output.xlsx') 

// const Excel = require('exceljs');

// async function exTest(){
//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet("My Sheet");

// worksheet.columns = [
//  {header: 'Id', key: 'id', width: 10},
//  {header: 'Name', key: 'name', width: 32}, 
//  {header: 'D.O.B.', key: 'dob', width: 15,}
// ];

// worksheet.addRow({id: 1, name: 'hamzi Doe', dob: new Date(1970, 1, 1)});
// worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});

// // save under export.xlsx
// await workbook.xlsx.writeFile('output.xlsx');

// //load a copy of export.xlsx
// const newWorkbook = new Excel.Workbook();
// await newWorkbook.xlsx.readFile('output.xlsx');

// const newworksheet = newWorkbook.getWorksheet('My Sheet');
// newworksheet.columns = [
//  {header: 'Id', key: 'id', width: 10},
//  {header: 'Name', key: 'name', width: 32}, 
//  {header: 'D.O.B.', key: 'dob', width: 15,}
// ];
// await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)});
// await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)});

// await newWorkbook.xlsx.writeFile('export2.xlsx');

// console.log("File is written");

// };

// exTest();


var Excel = require('exceljs')
var workbook = new Excel.Workbook()
var arr=[]
json ={
    id:"test",
    name:"test",
    any:"test"
}
workbook.xlsx.readFile('output.xlsx')
.then(function(){
 var worksheet = workbook.getWorksheet("My Sheet")
var row =[
[   json.id, json.name, json.any],
[99,"training","Y"]
]


worksheet.addRows(row)
  return  workbook.xlsx.writeFile('output.xlsx')
})