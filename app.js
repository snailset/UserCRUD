var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var setRoutes = require('./routes/routes');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//-- 加载http请求的日志中间件
app.use(logger('dev'));
//-- 加载用于解析 json 的中间件
app.use(bodyParser.json());
//-- 加载编码URL的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 加载用于解析 cookie 的中间件
app.use(cookieParser());
//-- public文件夹下是可以直接被访问的 http://localhost:3000/stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));

//-- 身份验证的中间件

//todo

//-- 用use代替get或post，实现程序的模块化，routes定义get、post方法
app.use('/', routes);
app.use('/users', users);
setRoutes(app);

// catch 404 and forward to error handler
//-- 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //console.log('xxxxxxssxx');
    res.render('error', {
            message: err.message,
            error: {}
    });
});


module.exports = app;
