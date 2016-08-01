/**
 * Created by SnailSet on 2016/7/30.
 */

var User = require('../controllers').User;

module.exports = function (app) {
    app.post('/save', User.save);
    app.post('/remove', User.remove);
    app.post('/update', User.update);
    app.post('/findByUsername', User.findByUsername);
    app.get('/findAllUser', User.findAllUser);
};