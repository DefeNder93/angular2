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
        qs: {access_token: socialToken},
        headers: {
          'User-Agent': 'LearnEnglish-App'
        }
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          info.provider = network;
          resolve(info);
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
  validateWithProvider(req.body.network, req.body.socialToken).then(profile => {
    let token = createJwt(profile);
    let userId = getUserIdFromProfile(profile);
    findUser(userId, req.body.network).then(r => r ? res.send(token) :
      createNewUser(userId, req.body.network).then(r => res.send(token)));
  }).catch(err => res.send('Failed!' + err.message));
});

router.post('/add-social', function (req, res) {
  if (!checkRights(req, res)) {
    return;
  }
  validateWithProvider(req.body.network, req.body.socialToken).then(profile => {
    let token = createJwt(profile);
    let userId = getUserIdFromProfile(profile);
    addSocialNetwork(userId, req.body.network, req.body.existingProvider, req.body.existingToken).then(r => res.send(token));
  }).catch(err => res.send('Failed!' + err.message));
});

router.get('/user', function(req, res) {
  let info = checkRights(req, res);
  findUser(getUserIdFromProfile(info), info.provider).then(r => res.send(r));
});

router.put('/user', function(req, res) {
  let info = checkRights(req, res);
  updateUser(getUserIdFromProfile(info), info.provider, req.body).then(r => {
    res.send(r);
  });
});

let getUserIdFromProfile = (p) => p.id || p.sub;

function findUser(id, provider) {
  return new Promise(function (resolve, reject) {
    let query = {};
    query['socials.' + provider] = id;
    db.collection('user').findOne(query, (err, result) => err ? reject(err) : resolve(result));
  }).catch(r => {
    console.log(r);
  });
}

function updateUser(id, provider, user) {
  let query = {}, update = {$set: {}};
  query['socials.' + provider] = id;
  update.$set.firstName = user.firstName;
  update.$set.lastName = user.lastName;
  update.$set.email = user.email;
  return db.collection('user').findOneAndUpdate(query, update).catch(r => console.log(r));
}

function addSocialNetwork(id, network, existingProvider, existingToken) {
  let query = {}, update = {$set: {}};
  let existingProviderInfo = verifyJwt(existingToken);
  query['socials.' + existingProvider] = getUserIdFromProfile(existingProviderInfo);
  update.$set['socials.' + network] = id;
  return db.collection('user').findOneAndUpdate(query, update).catch(r => console.log(r));
}

function createNewUser(id, network) {
  let newUser = getNewUserTemplate();
  newUser.socials[network] = id;
  return db.collection('user').insertOne(newUser).catch(r => console.log(r));
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

function checkRights(req, res) {
  let jwtString = req.headers.auth;
  try {
    return verifyJwt(jwtString);
  } catch (err) {
    res.send('Not allowed');
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
