/**
 * Created by SnailSet on 2016/7/30.
 */


var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var userSchema = new Schema({
    username : String,
    password : String,
    age: Number
});

mongoose.model('User', userSchema);
