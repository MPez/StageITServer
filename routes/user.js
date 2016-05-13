var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var userModel = mongoose.model('user');

/* GET users listing. */
router.post('/', function(req, res, next) {
    userModel.findOne(req.body.email, function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        if(user.password == req.body.password) {
            res.send("success");
        }
        else {
            res.send("failure");
        }
    });
});

router.get('/:email', function(req, res, next) {
    userModel.findOne(req.params.email, '-password', function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        res.send(user);
    });
});

router.post('/:email/stage/inizia', function (req, res, next) {
    userModel.findOneAndUpdate(req.params.email,
        {$push: {stage_id_start: {stage_id: req.body.stage_id, time: new Date()}}},
        {fields:'-password', new: 'true'} ,
        function (err,  user) {
            if(err) {
                console.error(err.stack);
            }
            console.log(user);
            res.send(user);
        });
});

router.post('/:email/stage/termina', function (req, res, next) {
    userModel.findOneAndUpdate(req.params.email,
        {$push: {stage_id_end:{stage_id: req.body.stage_id, time: new Date()}}},
        {fields:'-password', new: 'true'} ,
        function (err,  user) {
            if(err) {
                console.error(err.stack);
            }
            console.log(user);
            res.send(user);
        });
});

module.exports = router;
