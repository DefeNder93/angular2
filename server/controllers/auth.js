var express = require('express');
var connection = require('../db/connection');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');

var db;
connection.then(function(connectedDb){
  db = connectedDb;
});

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '995361108283-ktr1i7ufe37rihcoin7toqch9faqvr8f.apps.googleusercontent.com',
    clientSecret: 'RCqxHdQDDbygLcSil-4yiWy1',
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log('auth ->>');
    return done(null, {});
  }
));

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

var providers = {
  facebook: {
    url: 'https://graph.facebook.com/me'
  },
  google: {
    url: 'https://www.googleapis.com/oauth2/v3/tokeninfo'
  },
  github: {
    url: 'https://api.github.com/user'
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
  return jwt.sign(profile, 'MY_PRIVATE_KEY', {
    expiresIn: '2d',
    issuer: 'MY_APP'
  });
}

function verifyJwt(jwtString) {
  return jwt.verify(jwtString, 'MY_PRIVATE_KEY', {
    issuer: 'MY_APP'
  });
}

exports.isAuthenticated = passport.authenticate('google', { session : false });
module.exports = router;
