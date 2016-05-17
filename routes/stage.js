/**
 * Created by marco on 06/05/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var stageModel = mongoose.model('stage');

router.get('/', function (req, res, next) {
    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});


router.get('/A..Z', function (req, res, next) {
    stageModel.find({}, null, {sort: 'azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});

router.get('/Z..A', function (req, res, next) {
    stageModel.find({}, null, {sort: '-azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});

router.get('/00:00..24:00', function (req, res, next) {
    stageModel.find({}, null, {sort: 'nome'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});

router.get('/24:00..00:00', function (req, res, next) {
    stageModel.find({}, null, {sort: '-nome'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});

router.get('/Svolti', function (req, res, next) {
    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
        res.send(stageList);
    });
});

router.get('/list', function (req, res, next) {
    stageModel.find({}, null, {sort: '_id'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"stage":[' + stageList + ']}';
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