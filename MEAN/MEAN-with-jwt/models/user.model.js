const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "Full Name can\'t be empty"   
    },
    email: {
        type: String,    
        required: "Email can\'t be empty",
        unique: true,
    },
    password: {
        type: String,    
        required: "Password can\'t be empty",
        minlength: [4, "Password Must Be atleast 4 characters"]   
    },
    saltSecret: String
});

//event
//for password hashing and encrypting
//this function will be executed before save function in user.controller.js
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//custom validation for email
userSchema.path('email').validate(function (val) {
    var emailRegex = /^([\w-\s.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); // Assuming email has a text attribute
 }, 'invalid email');

//we used this package because normal way didn't work 
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

//name in database should be plural of this
mongoose.model('User', userSchema);