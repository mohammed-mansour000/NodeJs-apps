const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; //expires in 3 days

//handle errors
const handleErrors = (err) => {
    const {message, code} = err;
    const error = {email: '', password: ''};

    //incorrect email -- login
    if(err.message == 'email doesn\'t exist'){
        error.email = "email doesn't exist";
    }
    
    //incorrect password -- login
    if(err.message == 'incorrect password'){
        error.password = "incorrect password";
    }
    
    //duplicate error code
    if(code == 11000){
        error["email"] = "Email already exists"
        return error;
    }

    //validation errors
    if(message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
        });
    }

    return error;
}

exports.signup_get = (req, res, next) => {
    res.render('signup')
}

exports.signup_post = async (req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);
    try{
        //since we put function that returns a promise as a variable
        //we need to put await
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(201).json({user: user._id});
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({
            errors
        });
    }
}

exports.login_get = (req, res, next) => {
    res.render('login')
}

exports.login_post = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }catch(err) { //here we catch the error we threw from  User.login()
        const errors = handleErrors(err)
        console.log(err.message)
        res.status(400).json({
            errors
        });
    }
}

exports.logout_get = (req, res) => {
    //we can't delete cookies so we set it empty with 1 millisecond expiration
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

const createToken = (id) => {
    console.log(`${process.env.JWT_KEY}`)
    return jwt.sign(
                        { id },
                        `${process.env.JWT_KEY}`,
                        {
                            expiresIn: maxAge
                        }
                    );
}