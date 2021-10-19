const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

// OAuth sign out route
router.get('/logout', authCtrl.logOut);

// Google OAuth login route
router.get('/google', authCtrl.googleLogin);

// Google OAuth callback route
router.get('/oauth2callback', authCtrl.googleCallback);

module.exports = router;
