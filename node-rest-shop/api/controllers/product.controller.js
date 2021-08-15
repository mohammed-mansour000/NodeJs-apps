const Product = require('../../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            //map it into a new array
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    });;
};

exports.products_create_product = (req, res, next) => {
    console.log(req.file.path)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save((err, doc) => {
        if(!err)
            res.status(201).json({
                message: "Product Saved!!",
                createdProduct: {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    userData: req.userData, 
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            });
        else{
            console.log(err);
            res.status(500).json({error: err});
        }
    });
};

exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then((result) => {
        //if there is an product with such id
        if(result){
            const response = {
                product: result,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + result._id
                }       
            }
            res.status(200).json(response);
            
        }else{
            res.status(404).json({
                message: "no valid entry found for provided ID"
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
    .exec()
    .then((result) => {
        res.status(200).json({
            message: "Product Deleted!!",
            request: {
                type: "POST",
                url: "http://localhost:3000/products/",
                body: { name: 'String', price: 'Number' }
            }
        }); 
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: id}, { $set: updateOps })
    .exec()
    .then((result) => {
        res.status(200).json({
            message: "Product Updated!!",
            request: {
                type: "PATCH",
                url: "http://localhost:3000/products/" + id
            }
        });
    }).catch((err) => {
        res.status(500).json({error: err});
    });
};

exports.products_search_product = (req, res, next) => {
    Product.find({name:req.query.name})
    .select('name price _id productImage')
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            //map it into a new array
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({error: err});
    });;
};