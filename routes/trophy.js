/**
 * StageITRun
 * Progetto per insegnamento Reti Wireless
 * @since Anno accademico 2015/2016
 * @author Pezzutti Marco 1084411
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var trophyModel = mongoose.model('trophy');

/**
 * Ritorna la lista di tutti i trofei
 */
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