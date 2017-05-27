"use strict";

let express = require('express');
//var path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
require('dotenv').config();
let user = require('./controllers/user');
let auth = require('./controllers/auth');
let passport = require('passport');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Auth");
  next();
});

app.use('/user', user);
app.use('/auth', auth);

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!')
});

module.exports = app;

