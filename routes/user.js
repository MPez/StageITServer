var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models');
var userModel = mongoose.model('user');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    userModel.findById(req.params.id, function (err, user) {
        console.log(user);
        if(err) {
            console.error(err.stack);
        }
        res.send(user);
    });
});

module.exports = router;
