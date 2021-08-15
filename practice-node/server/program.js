var r = require('find'); // npm i find, package to find files in same dirname 
var c = require('chalk'); // npm i chalk, package to color the output

r.file(__dirname,function(files){
    //console.log(files.length)
    files.forEach(element => {
        if(element.indexOf('docx') > 0){

            var x = element + ": " + element.indexOf('docx');
            console.log(c.blue(element));
        
        }
    });
});