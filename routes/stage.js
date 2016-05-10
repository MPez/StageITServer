/**
 * Created by marco on 06/05/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var stageModel = mongoose.model('stage');

router.get('/', function (req, res, next) {
    stageModel.find({}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        console.log(stageList);
        obj = '{"stage":[' + stageList + ']}';
        res.send(obj);
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