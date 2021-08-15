const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        //getting the tokens from headers and split => Bearer
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "" + process.env.JWT_KEY);
        console.log(decoded)
        //now adding this value into req, we can access it by req.userData since we created it
        req.userData = decoded;
        if(decoded.email === 'hamzi@gmail.com'){
            next();
        }else{
            return res.status(401).json({
                message: 'Auth-Token Failed not hamzi',
            });
        }
       // next();
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message: 'Auth-Token Failed',
        });
    }
}