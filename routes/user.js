var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var userModel = mongoose.model('user');

/* GET users listing. */
router.post('/', function(req, res, next) {
    userModel.findOne({email:req.body.email}, function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        if(user.password == req.body.password) {
            console.log("password control success");
            res.send("success");
        }
        else {
            console.log("password control failure");
            res.send("failure");
        }
    });
});

router.post('/registra', function (req, res, next) {
    var newUser = new userModel({
        nome: req.body.nome,
        cognome: req.body.cognome,
        email: req.body.email,
        password: req.body.password,
        stage_id_start: [],
        stage_id_end: [],
        trofei_id: []
    });


    newUser.save(function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        else {
            console.log("nuovo utente registrato");
            console.log(user);
            res.send(user);
        }
    });
});

router.get('/:email', function(req, res, next) {
    userModel.findOne({email:req.params.email}, '-password', function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        res.send(user);
    });
});

router.post('/:email/stage/inizia', function (req, res, next) {
    userModel.findOneAndUpdate({email:req.params.email},
        {$push: {stage_id_start: {stage_id: req.body.stage_id, time: new Date()}}},
        {fields:'-password', new: 'true'} ,
        function (err,  user) {
            if(err) {
                console.error(err.stack);
            }
            res.send(user);
        });
});

router.post('/:email/stage/termina', function (req, res, next) {
    userModel.findOneAndUpdate({email:req.params.email},
        {$push: {stage_id_end:{stage_id: req.body.stage_id, time: new Date()}}},
        {fields:'-password', new: 'true'} ,
        function (err,  user) {
            if(err) {
                console.error(err.stack);
            }
            res.send(user);
        });
});

module.exports = router;
