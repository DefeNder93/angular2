"use strict";

let express = require('express');
let connection = require('../db/connection');
let router = express.Router();
let ObjectID = require('mongodb').ObjectID;

let db;
connection.then(function(connectedDb){
  db = connectedDb;
});

router.get('/', function(req, res, next) {
  connection.then(function(){
    db.collection('task').find().toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

router.get('/:taskId', function(req, res, next) {
  connection.then(function(){
    db.collection('task').findOne({_id: ObjectID(req.params.taskId)}, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
