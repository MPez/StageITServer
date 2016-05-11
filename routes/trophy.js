/**
 * Created by marco on 10/05/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var trophyModel = mongoose.model('trophy');

router.get('/', function (req, res, next) {
    trophyModel.find({}, null, {sort: '_id'}, function (err, trophyList) {
        if(err) {
            console.error(err.stack);
        }
        //obj = '{"trofeo":[' + trophyList + ']}';
        res.send(trophyList);
    });
});

module.exports = router;