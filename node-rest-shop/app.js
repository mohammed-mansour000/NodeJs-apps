const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
require('./connection');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//using this to enable cors, instead of using cors package
// app.use((res, req, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, PUT, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });
//Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    //if(!err) return next();
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
    console.log(err)
});

module.exports = app;