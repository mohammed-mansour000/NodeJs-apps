const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.user_signup = (req, res, next) => {
    //before creating a new user, we should check if it already exists
    User.find({ email: req.body.email })
    .exec()
    .then((user) => {
        if(user.length > 0){
            console.log(user)
            return res.status(409).json({
                message:"email already exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then((result) => {
                        res.status(201).json({
                            message: "User Created"
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
   
};

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
        if(!user){
            return res.status(401).json({
                message: 'Auth Failed, User doesn\'t exist'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result){
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id,
                    }, 
                    `${process.env.JWT_KEY}`,
                    {
                        expiresIn: '1h'
                    }
                );
                console.log(token)
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth Failed, Wrong Password'
            });
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json({
                message: 'User deleted',
                request: {
                    type: "POST",
                    url: "http://localhost:3000/users/",
                }
            });   
        }else{
            return res.status(500).json({
                message: "Deletion Failed"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};