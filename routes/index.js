var express = require('express');
var router = express.Router();

const passport = require('passport');
const patient = require('../models/patient');
const user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Doctor Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate( 
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect: '/',
      failureRedirect: '/'
    }
  )
);  

// Google OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router; 
