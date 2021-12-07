const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authRequire = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json webtokens if exists
    if(token){
        jwt.verify(token, "" + process.env.JWT_KEY, (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }

        });
    }else{
        res.redirect('/login');
    }
}

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json webtokens if exists
    if(token){
        jwt.verify(token, "" + process.env.JWT_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }

        });
    }else{
        res.locals.user = null
        next();
    }
}
