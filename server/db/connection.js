"use strict";

let MongoClient = require('mongodb').MongoClient;
let Promise = require('promise');

let connectPromise = new Promise(function(resolve, reject) {
  MongoClient.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, function (err, db) {
    if (err) throw err;
    resolve(db);
  });
});

module.exports = connectPromise;
