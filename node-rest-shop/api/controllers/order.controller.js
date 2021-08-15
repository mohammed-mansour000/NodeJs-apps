const Order = require('../../models/order');
const Product = require('../../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    //return object of the product according to productId
    .populate('product')
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    product: doc.product,
                    quantity: doc.quantity,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_create_order = (req, res, next) => {
    //check if product is existed first
    Product.findById(req.body.productId)
    .then((product) => {
        if(product){
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            order.save()
            .then((result) => {
                res.status(201).json({
                    message: "Order Created!!",
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                    },
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + result._id
                    }
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });     
        }else{
            return res.status(404).json({
                message: "Product not found",
            });
        }
           
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .select('product quantity _id')
    //return object of the product according to productId
    .populate('product')
    .exec()
    .then((order) => {
        //if there is an order with such id
        if(order){
            const response = {
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + order._id
                }       
            }
            res.status(200).json(response);
        }else{
            return res.status(404).json({
                message: "Order not found"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json({
                message: 'order deleted',
                request: {
                    type: "POST",
                    url: "http://localhost:3000/orders/",
                    body: { product: 'ID', quantity: 'Number' }
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