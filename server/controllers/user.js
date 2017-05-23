var express = require('express');
var connection = require('../db/connection');
var router = express.Router();

var db;
connection.then(function(connectedDb){
  db = connectedDb;
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.then(function(){
    db.collection('user').find().toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
