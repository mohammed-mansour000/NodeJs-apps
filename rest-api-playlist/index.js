const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const apiRoute = require('./routes/api');
require('./nodemon.json');
//connect to mongodb
mongoose.connect(
    process.env.MONGODB_URI, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("connected");
    }
});

//middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRoute);

app.use((req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);

});

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err.message
    });
});

//adding port and listen to the server
const port = process.env.PORT || 3000;
app.listen(port);