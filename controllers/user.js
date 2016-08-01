/**
 * Created by SnailSet on 2016/7/30.
 */

var User = require('../proxy').User;

/**
 * 保存用户
 * @param req
 * @param res
 * @param next
 *
 * 接受参数:
 * username : 用户名
 * password : 用户密码
 */
exports.save = function (req, res, next) {
 //   console.log("access the save");
 //    var username = 'snail1234';
 //    var password = 'a123dd456';
    var username = req.body.username;
    var password = req.body.password;
    if( !validate(res, username, "用户名") ){
        return ;
    }
    if( !validate(res, password, "密码") ){
        return ;
    }
/*    if (typeof username === 'undefined'){
        console.log("----------username is undefined--------");
    }
    console.log('save username :' + username);*/
    User.findByUsername(username, function (err, user) {
        if (err){
             return res.json({err : err});
           // console.log(err);
           // next(err);
        }
        if (user){
            // console.log(user);
            return res.json({result : '用户名已存在'});
        }

        User.save(username, password, function (err) {
            if(err){
                return res.json({err : err});
            }

            //console.log('保存用户成功');
            res.send({result : "保存用户成功"});
        })
    });
};

/**
 * 删除用户
 * @param req
 * @param res
 * @param next
 *
 * 接受参数：
 * username : 用户名
 */
exports.remove = function (req, res, next) {

    var username = req.body.username;

    if ( !validate(res, username, "用户名")) return;

    console.log("username : " + username);
    User.findByUsername(username, function (err, user) {
        if (err){
            return res.json({err : err});
        }
        if (!user){
            return res.json({result : "用户不存在"});
        }
        User.removeByUsername(username, function (err) {
            if (err){
                return res.json({err : err});
            }
            return res.json({result : '删除用户成功'});
        })
    });
};

/**
 * 修改用户信息
 * @param req
 * @param res
 * @param next
 * 接受参数：
 * username : 用户名
 * password : 密码
 * age : 年龄
 */
exports.update = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    // var username = 'snail';
    // var password = '52425';
    // var age = 34;

    if (!validate(res, username, "用户名")) return;
    if (!validate(res, password, "密码")) return;
    if (!validate(res, age, "年龄")) return;

    var user1 = {
        username : username,
        password : password,
        age : age
    };
    User.findByUsername(username, function (err, user) {
        if (err){
            return res.json({err : err});
        }
        if (!user){
            return res.json({result : "用户不存在"});
        }
        User.update(user1, function (err) {
            if (err){
                return res.json({err : err});
            }
            return res.json({result : '修改用户成功'});
        });
    });
};

/**
 * 根据用户id查询用户信息
 * @param req
 * @param res
 * @param next
 * 接受参数
 * username : 用户名
 */
exports.findByUsername = function (req, res, next) {
    // var username = 'snail';
    var username = req.body.username;
    if (!validate(res, username, "用户名")) return;

    User.findByUsername(username, function (err, user) {
        if (err){
            return res.json({err : err});
        }
        if (!user){
            return res.json({result : "用户不存在"});
        }
        return res.json({result : user});
    })
}

/**
 * 查询所有的用户
 * @param req
 * @param res
 * @param next
 */
exports.findAllUser = function (req, res, next) {
    User.findAllUser(function (err, users) {
        if (err){
            return res.json({err : err});
        }
        if (!users){
            return res.json({result : "用户不存在"});
        }
        return res.json({result : users});
    })
}

/**
 * 判断一个请求字符串是否合法
 * @param res response对象
 * @param str 验证的字符串
 * @param context 改字符串表示的含义
 * @returns {boolean} 验证通过返回true 否则返回false
 */
function validate(res, str, context){
    if (typeof str === 'undefined'){
        res.status(401);
        res.json({result : '无'+context});
        return false;
    }
    if (str.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "") === ""){
        res.status(402);
        res.json({result : context+'不能为空'});
        return false;
    }
    return true;
}