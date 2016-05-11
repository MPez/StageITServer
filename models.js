/**
 * Created by marco on 06/05/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id : String,
    nome : String,
    cognome : String,
    email : String,
    password : String,
    stage_id : [],
    trofei_id : []
});

var trofeiSchema = new Schema({
    _id : String,
    nome : String,
    descrizione : String,
    descrizione_lunga : String
});

var stageSchema = new Schema({
    _id : String,
    nome : String,
    azienda : String,
    descrizione : String
});

mongoose.connect('mongodb://localhost:27017/StageITdb');
module.exports = mongoose.model('user', userSchema);
module.exports = mongoose.model('trophy', trofeiSchema);
module.exports = mongoose.model('stage', stageSchema);
