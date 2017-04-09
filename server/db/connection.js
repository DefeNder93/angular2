var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');

var connectPromise = new Promise(function(resolve, reject) {
  MongoClient.connect('mongodb://localhost:27017/learn_english', function (err, db) {
    if (err) throw err;
    resolve(db);
  });
});

module.exports = connectPromise;
