/**
 * StageITRun
 * Progetto per insegnamento Reti Wireless
 * @since Anno accademico 2015/2016
 * @author Pezzutti Marco 1084411
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema del documento utente
 */
var userSchema = new Schema({
    nome : String,
    cognome : String,
    email : {type: String, unique: true, index: true},
    password : String,
    stage_id_start : [{
        stage_id : String,
        time : Date
    }],
    stage_id_end : [{
        stage_id : String,
        time : Date
    }],
    trofei_id : [],
    stage_done : Number
}, {
    versionKey: false
});

/**
 * Schema del documento trofeo
 */
var trofeiSchema = new Schema({
    _id : String,
    nome : String,
    descrizione : String,
    descrizione_lunga : String
});

/**
 * Schema del documento stage
 */
var stageSchema = new Schema({
    _id : String,
    nome : String,
    azienda : String,
    descrizione : String,
    coda : Number
});

mongoose.connect('mongodb://localhost:27017/StageITdb');
module.exports = mongoose.model('user', userSchema);
module.exports = mongoose.model('trophy', trofeiSchema);
module.exports = mongoose.model('stage', stageSchema);
