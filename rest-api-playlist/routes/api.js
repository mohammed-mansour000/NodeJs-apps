const express = require('express');
const router = express.Router();

const Ninja = require('../models/ninga');

router.get('/ninjas', (req, res, next) => {
    // Ninja.find()
    // .then((result) => {
    //     res.status(200).json(result);
    // }).catch(next);
    var points = {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    }
    Ninja.aggregate(
        [
            {
                $geoNear: {
                    near: points,
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    spherical: true                
                }
            }
        ]        
    ).then((result) => {
        res.send(result);
    }).catch(next);
});

router.post('/ninjas', (req, res, next) => {
    console.log(req.body)
    var ninja = new Ninja(req.body);
    ninja.save()
    .then((result) => {
        res.status(201).json({
            message: result
        });
    }).catch(next); //by passing next we go to next middleware which is error handling middleware
});

router.delete('/ninjas/:id', (req, res, next) => {
    console.log(req.params.id);
    Ninja.findByIdAndRemove({ _id: req.params.id })
    .then((result) => {
        //if item is existed
        if(result) {
            res.status(201).json(result);
        }else{
            res.status(404).json({message: "No Ninja found"});
        }
    }).catch(next);
});

router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body )
    .then((result) => {
        //if item is existed
        if(result) {
            res.status(201).json({
                message: "Ninja Updated!!"
            });
        }else{
            res.status(404).json({message: "No Ninja found"});
        }
    }).catch(next);
});

module.exports =  router;