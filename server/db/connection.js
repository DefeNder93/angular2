var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');

var connectPromise = new Promise(function(resolve, reject) {
  MongoClient.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, function (err, db) {
    if (err) throw err;
    resolve(db);
  });
});

module.exports = connectPromise;
