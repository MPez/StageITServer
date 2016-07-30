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
var stageModel = mongoose.model('stage');
var userModel = mongoose.model('user');

/**
 * Ritorna la lista degli stage in ordine alfabetico crescente
 */
router.get('/:email/abc/asc', function (req, res, next) {
    stageModel.find({}, null, {sort: 'azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

/**
 * Ritorna la lista degli stage in ordine alfabetico decrescente
 */
router.get('/:email/abc/desc', function (req, res, next) {
    stageModel.find({}, null, {sort: '-azienda'}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

/**
 * Ritorna la lista degli stage in ordine di coda crescente
 */
router.get('/:email/coda/asc', function (req, res, next) {
    stageModel.find({}, null, {sort: {'coda':1, 'azienda':1}}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

/**
 * Ritorna la lista degli stage in ordine di coda decrescente
 */
router.get('/:email/coda/desc', function (req, res, next) {
    stageModel.find({}, null, {sort: {'coda':-1, 'azienda':1}}, function (err, stageList) {
        if(err) {
            console.error(err.stack);
        }
        res.send(stageList);
    });
});

module.exports = router;