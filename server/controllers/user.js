var express = require('express');
var connection = require('../db/connection');
var router = express.Router();
var authController = require('./auth');

var db;
connection.then(function(connectedDb){
  db = connectedDb;
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.then(function(){
    db.collection('user').find().toArray(function (err, result) {
      console.log('7777 ' + authController.isAuthenticated);
      if (err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
