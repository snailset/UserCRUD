/**
 * Created by SnailSet on 2016/7/31.
 */

var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest')(app);
var userModel = require('../../models/index').User;
var userProxy = require('../../proxy/index').User;
//
// function add(x, y) {
//     return x + y;
// }

// describe('加法函数的测试', function() {
//     it('1 加 1 应该等于 2', function() {
//         expect(add(1, 1)).to.be.equal(2);
//     });
// });

describe('test controllers/user.js', function () {
    describe('#save', function () {
        /**
         * 在测试保存用户之前，要先清空users文档
         */
        before(function (done) {
            userModel.remove({}, function (err) {
                done(err);
            });
        });

        it('1. expect status is 401 and include not username', function (done) {
            request.post('/save')
                .send({
                    password : '4545'
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无用户名');
                    done(err);
                });
        });

        it('2. expect status is 402 and and include username should not be empty', function (done) {
            request.post('/save')
                .send({
                    username : ' ' ,
                    password : '4545'
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('用户名不能为空');
                    done(err);
                });
        });

        it('3. expect status is 401 and include not password', function (done) {
            request.post('/save')
                .send({
                    username : '4545'
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无密码');
                    done(err);
                });
        });

        it('4. expect status is 402 and and include password should not be empty', function (done) {
            request.post('/save')
                .send({
                    username : '4545' ,
                    password : ' '
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('密码不能为空');
                    done(err);
                });
        });

        it('5. expect include save user success', function (done) {
            request.post('/save')
                .send({
                    username : '324534',
                    password : '52145'
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('保存用户成功');
                    userProxy.findByUsername('324534', function (err, user) {
                        expect(user.password).to.be.equal('52145');
                        expect(user.age).to.be.equal(0);
                        done(err);
                    });
                });
        });

        it('6. expect include username has existed', function (done) {
            request.post('/save')
                .send({
                    username : '324534',
                    password : '52145'
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('用户名已存在');
                    done(err);
                });
        });
    });

    describe('#remove', function () {
        /**
         * 在测试删除用户之前要清空users集合，然后插入一条文档
         */
        before(function (done) {
            userModel.remove({}, function (err) {
                var user = {
                    username : 'snail',
                    password : '123456',
                    age : 0
                };
                userModel.create(user, function (err) {
                    done(err);
                });
            });
        });

        it('1. expect status is 401 and include not username', function (done) {
            request.post('/remove')
                .send({
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无用户名');
                    done(err);
                });
        });

        it('2. expect status is 402 and and include username should not be empty', function (done) {
            request.post('/remove')
                .send({
                    username : ' ' ,
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('用户名不能为空');
                    done(err);
                });
        });
        
        it('3. expect user does not exist', function (done) {
            request.post('/remove')
                .send({
                    username : 'yin' ,
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('用户不存在');
                    done(err);
                });
        });

        it('4. expect remove user successfully', function (done) {
            request.post('/remove')
                .send({
                    username : 'snail' ,
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('删除用户成功');
                    userProxy.findByUsername('snail', function (err, user) {
                        // expect(user).to.be.empty;
                        expect(user).to.be.equal(null);
                        done(err);
                    });
                });
        });
    });

    describe('#update', function () {
        /**
         * 在测试删除用户之前要清空users集合，然后插入一条文档
         */
        before(function (done) {
            userModel.remove({}, function (err) {
                var user = {
                    username : 'snail',
                    password : '123456',
                    age : 0
                };
                userModel.create(user, function (err) {
                    done(err);
                });
            });
        });

        it('1. expect status is 401 and include not username', function (done) {
            request.post('/update')
                .send({
                    password : '541545',
                    age : 45
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无用户名');
                    done(err);
                });
        });

        it('2. expect status is 402 and and include username should not be empty', function (done) {
            request.post('/update')
                .send({
                    username : ' ' ,
                    password : '541545',
                    age : 45
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('用户名不能为空');
                    done(err);
                });
        });

        it('3. expect status is 401 and include not password', function (done) {
            request.post('/update')
                .send({
                    username : '541545',
                    age : 45
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无密码');
                    done(err);
                });
        });

        it('4. expect status is 402 and and include password should not be empty', function (done) {
            request.post('/update')
                .send({
                    username : '6545' ,
                    password : ' ',
                    age : 45
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('密码不能为空');
                    done(err);
                });
        });

        it('5. expect status is 401 and include not age', function (done) {
            request.post('/update')
                .send({
                    password : '541545',
                    username : 'sfdffd'
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无年龄');
                    done(err);
                });
        });

        it('6. expect status is 402 and and include age should not be empty', function (done) {
            request.post('/update')
                .send({
                    username : 'sdfsdfsf' ,
                    password : '541545',
                    age : ' '
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('年龄不能为空');
                    done(err);
                });
        });

        it('7. expect user does not exist', function (done) {
            request.post('/update')
                .send({
                    username : 'sdfsdjf' ,
                    password : '541545',
                    age : '25'
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('用户不存在');
                    done(err);
                });
        });

        it('8. expect update user successfully', function (done) {
            request.post('/update')
                .send({
                    username : 'snail' ,
                    password : 'newpwd',
                    age : '25'
                })
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.include('修改用户成功');
                    userProxy.findByUsername('snail', function (err, user) {
                        // expect(user).to.be.empty;
                        expect(user.username).to.be.equal('snail');
                        expect(user.password).to.be.equal('newpwd');
                        expect(user.age).to.be.equal(25);
                        done(err);
                    });
                });
        })
    });

    describe('#findByUsername', function () {
        /**
         * 在测试删除用户之前要清空users集合，然后插入一条文档
         */
        before(function (done) {
            userModel.remove({}, function (err) {
                var user = {
                    username : 'snail',
                    password : '123456',
                    age : 0
                };
                userModel.create(user, function (err) {
                    done(err);
                });
            });
        });

        it('1. expect status is 401 and include not username', function (done) {
            request.post('/findByUsername')
                .send({
                })
                .expect(401)
                .end(function (err, res) {
                    expect(res.text).to.include('无用户名');
                    done(err);
                });
        });

        it('2. expect status is 402 and and include username should not be empty', function (done) {
            request.post('/findByUsername')
                .send({
                    username : ' '
                })
                .expect(402)
                .end(function (err, res) {
                    expect(res.text).to.include('用户名不能为空');
                    done(err);
                });
        });

        it('3. expect findByUsername successfully', function (done) {
            request.post('/findByUsername')
                .send({
                    username : 'snail'
                })
                .expect(200)
                .end(function (err, res) {
                    var result = JSON.parse(res.text);
                    console.log(result.result.username);
                    expect(result.result.username).to.be.equal('snail');
                    expect(result.result.password).to.be.equal('123456');
                    expect(result.result.age).to.be.equal(0);
                    // expect(res.text).to.include('修改用户成功');

                    done(err);
                });
        })
    });
});

