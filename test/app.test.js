/**
 * Created by SnailSet on 2016/8/1.
 */
var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);

describe('test/app.test.js', function () {
    it('expect / status 200', function (done) {
        request.get('/')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });
});