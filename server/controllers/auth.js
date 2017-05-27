"use strict";

let express = require('express');
let connection = require('../db/connection');
let router = express.Router();
let jwt = require('jsonwebtoken');
let request = require('request');

let db;
connection.then(function(connectedDb){
  db = connectedDb;
});

let providers = {
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
  return new Promise(function (resolve, reject) {
    // Send a GET request to Facebook with the token as query string
    request({
        url: providers[network].url,
        qs: {access_token: socialToken}
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
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
  let network = req.body.network;
  let socialToken = req.body.socialToken;
  validateWithProvider(network, socialToken).then(profile => {
    let token = createJwt(profile);
    findUser(profile.id).then(r => {
      r ? res.send(token) // user is exists
        : createNewUser(profile.id, network).then(r => {
          res.send(token); // new user was created
        });
    });
  }).catch(err => res.send('Failed!' + err.message));
});

function findUser(id) {
  return new Promise(function (resolve, reject) {
    db.collection('user').findOne({'socials.facebook': id}, function(err, result){
      err ? reject(err) : resolve(result);
    });
  }).catch(r => {
    console.log(r);
  });
}

function createNewUser(id, network) {
  let newUser = getNewUserTemplate();
  newUser.socials[network] = id;
  return db.collection('user').insertOne(newUser).catch(r => {
    console.log(r);
  });
}

function getNewUserTemplate() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    socials: {
      facebook: null,
      google: null,
      github: null
    }
  }
}

// just for test
router.get('/secured', function (req, res) {
  let jwtString = req.headers.auth;
  console.log('jwtString');
  console.log(req.headers);
  try {
    let profile = verifyJwt(jwtString);
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
