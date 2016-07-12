var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var userModel = mongoose.model('user');
var stageModel = mongoose.model('stage');

/* GET users listing. */
router.post('/', function(req, res, next) {
    userModel.findOne({email:req.body.email}, function (err, user) {
        if (err) {
            console.error(err.stack);
        }
        if (user != null) {
            if (user.password == req.body.password) {
                console.log("password control success");
                res.send("success");
            }
            else {
                console.log("password control failure");
                res.send("failure");
            }
        } else {
            console.log("user not found");
            res.send("not found");
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
            res.send("success");
        }
    });
});

router.get('/rank', function (req, res, next) {
    userModel.find({}, null, {sort: '-stage_done'}, function (err, userList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(userList);
    });

    // userModel.aggregate([ {"$project": {
    //     "nome":1,
    //     "cognome":1,
    //     "email":1,
    //     "stage_id_end":1,
    //     "size": {"$size":"$stage_id_end"}
    // }},
    //     {"$sort": {"size": -1}},
    //     {"$project":{
    //         "nome":1,
    //         "cognome":1,
    //         "email":1,
    //         "stage_id_end":1
    //     }}], function (err, userList) {
    //     if(err) {
    //         console.error(err.stack);
    //     } else {
    //         res.send(userList);
    //     }
    // });
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
    userModel.findOne({email:req.params.email, 'stage_id_start.stage_id': req.body.stage_id},
        function (err, user) {
            if(err) {
                console.error(err.stack);
            }
            if(user == null) {
                userModel.findOneAndUpdate({email:req.params.email},
                    {$push: {stage_id_start: {stage_id: req.body.stage_id, time: new Date()}}},
                    {fields:'-password', new: 'true'} ,
                    function (err,  user) {
                        if(err) {
                            console.error(err.stack);
                        }
                        stageModel.findOneAndUpdate({_id:req.body.stage_id},
                            {$inc: {coda: 1}}, function (err, stage) {
                                if(err) {
                                    console.error(err.stack);
                                }
                            });
                        console.log("stage iniziato");
                        res.send("stage iniziato");
                    });

            } else {
                console.log("stage presente");
                res.send("stage presente");
            }
        });
});

router.post('/:email/stage/termina', function (req, res, next) {
    userModel.findOne({email:req.params.email, 'stage_id_end.stage_id': req.body.stage_id},
        function (err, user) {
            if (err) {
                console.error(err.stack);
            }
            if (user == null) {
                userModel.findOneAndUpdate({email: req.params.email},
                    {$push: {stage_id_end: {stage_id: req.body.stage_id, time: new Date()}},
                        $inc: {stage_done: 1}},
                    {fields: '-password', new: 'true'},
                    function (err, user) {
                        if (err) {
                            console.error(err.stack);
                        }
                        stageModel.findOneAndUpdate({_id:req.body.stage_id},
                            {$inc: {coda: -1}}, function (err, stage) {
                                if(err) {
                                    console.error(err.stack);
                                }
                            });
                        console.log("stage terminato");
                        res.send("stage terminato");
                    });

            } else {
                console.log("stage presente");
                res.send("stage presente");
            }
        });
});

router.post('/:email/trofeo/aggiungi', function (req, res, next) {
    userModel.findOneAndUpdate({email:req.params.email},
        {$addToSet: {trofei_id: req.body.trofeo_id}},
        {fields: '-password', new: 'true'},
        function (err, user) {
        if(err) {
            console.error(err.stack);
        }
        res.send("trofeo aggiunto");
    });
});

module.exports = router;
