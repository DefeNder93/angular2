var express = require('express');
var connection = require('../db/connection');
var router = express.Router();

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

exports.isAuthenticated = passport.authenticate('google', { session : false });
module.exports = router;
