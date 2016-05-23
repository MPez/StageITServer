/**
 * Created by marco on 06/05/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

router.get('/:email/abc/asc', function (req, res, next) {
    stageModel.find({}, null, {sort: 'azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/abc/desc', function (req, res, next) {
    stageModel.find({}, null, {sort: '-azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/coda/asc', function (req, res, next) {
    stageModel.find({}, null, {sort: {'coda':1, 'azienda':1}}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

router.get('/:email/coda/desc', function (req, res, next) {
    stageModel.find({}, null, {sort: {'coda':-1, 'azienda':1}}, function (err, stageList) {
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
        res.send(stage);
    });
});

module.exports = router;