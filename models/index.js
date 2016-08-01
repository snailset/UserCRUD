/**
 * Created by SnailSet on 2016/7/30.
 */

var config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    // console.log("------ msg : connect success  -------");
});

//models
require('./user');



exports.User = mongoose.model('User');
