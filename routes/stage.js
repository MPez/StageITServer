/**
 * Created by marco on 06/05/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var models = require('../models');
var stageModel = mongoose.model('stage');
var userModel = mongoose.model('user');

router.get('/', function (req, res, next) {
    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});


router.get('/:email/A..Z', function (req, res, next) {
    stageModel.find({}, null, {sort: 'azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/Z..A', function (req, res, next) {
    stageModel.find({}, null, {sort: '-azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/00..24', function (req, res, next) {
    stageModel.find({}, null, {sort: 'coda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/24..00', function (req, res, next) {
    stageModel.find({}, null, {sort: '-coda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/Done', function (req, res, next) {
    userModel.findOne({email:req.params.email}, 'stage_id_end.stage_id', function (err, stage_list) {
        console.log(stage_list);
    });

    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/To-do', function (req, res, next) {
    stageModel.find({}, null, {sort: '-_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/list', function (req, res, next) {
    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
} );


router.get('/:id', function (req, res, next) {
    stageModel.findById(req.params.id, function (err, stage) {
        if(err) {
            console.error(err.stack);
        }
        console.log(stage);
        res.send(stage);
    });
});

module.exports = router;