"use strict";

let express = require('express');
let connection = require('../db/connection');
let router = express.Router();

let db;
connection.then(function(connectedDb){
  db = connectedDb;
});

router.get('/', function(req, res, next) {
  connection.then(function(){
    db.collection('user').find().toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

router.get('/self', function(req, res, next) {
  // TODO get user by auth info
});

router.put('/self', function(req, res, next) {
  // TODO put user auth info
});

module.exports = router;
