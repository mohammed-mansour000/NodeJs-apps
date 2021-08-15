const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect("mongodb://localhost:27017/MongoDB-CRUD", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if(!err) { console.log("Connection Succeeded"); } 
    else { console.log("Connection Error: " + err); } 
});

require('./employee.model');