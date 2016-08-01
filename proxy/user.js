/**
 * Created by SnailSet on 2016/7/30.
 */

var models = require('../models');

var User = models.User;


exports.save = function(username, password, callback){
    var user = {
        username : username,
        password : password,
        age : 0
    };
    User.create(user, callback);
};


/*exports.save = function (user, callback) {
    user.save(callback);
};*/

exports.removeByUsername = function (username, callback) {

    User.remove({username : username}, callback);

};


exports.update = function(user, callback){
    // console.log('access the proxy update');
    // console.log(user);
    var conditions = {username : user.username};
    var update = {$set : {password : user.password, age : user.age}};
    var options = {multi : true};  //--多行受影响也更新,有以下选项
    // safe (boolean) safe mode (defaults to value set in schema (true))
    // upsert (boolean) whether to create the doc if it doesn't match (false)
    // multi (boolean) whether multiple documents should be updated (false)
    // strict (boolean) overrides the strict option for this update
    // overwrite (boolean) disables update-only mode, allowing you to overwrite the doc (false)
    User.update(conditions, update, options, callback);
};

exports.findByUsername = function (username, callback) {
    User.findOne({username : username}, callback);
};

exports.findAllUser = function (callback) {
    User.find(callback);
};