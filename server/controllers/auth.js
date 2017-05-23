var express = require('express');
var connection = require('../db/connection');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');

var db;
connection.then(function(connectedDb){
  db = connectedDb;
});

var providers = {
  facebook: {
    url: process.env.FACEBOOK_URL || 'https://graph.facebook.com/me'
  },
  google: {
    url: process.env.GOOGLE_URL || 'https://www.googleapis.com/oauth2/v3/tokeninfo'
  },
  github: {
    url: process.env.GITHUB_URL || 'https://api.github.com/user'
  }
};

function validateWithProvider(network, socialToken) {
  console.log('validateWithProvider');
  return new Promise(function (resolve, reject) {
    // Send a GET request to Facebook with the token as query string
    request({
        url: providers[network].url,
        qs: {access_token: socialToken}
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('resolve');
          console.log(response);
          resolve(JSON.parse(body));
        } else {
          console.log('error');
          console.log(error);
          reject(error);
        }
      }
    );
  });
}

router.post('/social', function (req, res) {
  var network = req.body.network;
  var socialToken = req.body.socialToken;
  validateWithProvider(network, socialToken).then(function (profile) {
    // Returns a server signed JWT
    res.send(createJwt(profile));
  }).catch(function (err) {
    res.send('Failed!' + err.message);
  });
});

router.get('/secured', function (req, res) {
  var jwtString = req.headers.auth;
  console.log('jwtString');
  console.log(req.headers);
  try {
    var profile = verifyJwt(jwtString);
    res.send('You are good people: ' + profile.id);
  } catch (err) {
    res.send('Hey, you are not supposed to be here');
  }
});

function createJwt(profile) {
  return jwt.sign(profile, process.env.PRIVATE_KEY, {
    expiresIn: '2d',
    issuer: 'APP'
  });
}

function verifyJwt(jwtString) {
  return jwt.verify(jwtString, process.env.PRIVATE_KEY, {
    issuer: 'APP'
  });
}

module.exports = router;
