var express = require('express');
var router = express.Router();
var passport = require('passport');
var patient = require('../models/patient');
var user = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Doctor Express' });
});
// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: "/patients/show",
    failureRedirect: '/'
}));
// Google OAuth logout route
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
