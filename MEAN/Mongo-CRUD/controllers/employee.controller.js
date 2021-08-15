const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


exports.addOrEditEmployee = (req, res) => {
    if(req.body._id == "")
        insertRecord(req, res);
    else
        updateRecord(req, res);
}


exports.getEmployeeList = (req, res) => {
    Employee.find((err, docs) => {
        if(!err)
            res.send(docs);
        else
            console.log("Error in retrieving employee list: " + err);
    });
}


function insertRecord(req, res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err, doc) => {
        if(!err)
            res.status(200).json({message:"Employee Saved!!"});
        else{
            if(err.name === "ValidationError"){
                handleValidationError(err, req.body);
                res.status(500).send(req.body);
            }else{
                console.log("Error during record insertion: " + err);
            }
        }
            
    });
}


function updateRecord(req, res){
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if(!err) {  res.status(200).send({message: "Employee Updated!!"}); }
        else{
            if(err.name === "ValidationError"){
                handleValidationError(err, req.body);
                res.status(500).send(req.body);
            }else{
                console.log("Error during record update: " + err);
            }
        }
    });
}


exports.getOneEmployee = (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err)
            res.send(doc);
        else
            console.log("Error in retrieving employee: " + err);
    });
}


exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err)
            // res.status(200).send("Employee Deleted!!"); 
            res.json({message:"Employee Deleted!!"}); 
        else
            // console.log("Error in deleting: " + err);
            res.status(404).json(err);
    });
}


function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default: 
                break;
        }
    }
}
