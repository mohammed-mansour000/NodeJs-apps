const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "this field is required"
    },
    email: {
        type: String,
        required: "this field is required",
        unique: true
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
});

//custom validation for email
employeeSchema.path('email').validate(function (val) {
    var emailRegex = /^([\w-\s.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); // Assuming email has a text attribute
 }, 'invalid email');


 //we used this package because normal way didn't work 
// Apply the uniqueValidator plugin to userSchema.
employeeSchema.plugin(uniqueValidator);


//name in database should be plural of this
mongoose.model('Employee', employeeSchema);