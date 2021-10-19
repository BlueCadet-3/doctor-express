const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/onboard', userCtrl.showOnboard);
router.post('/onboard', userCtrl.handleOnboard);

module.exports = router;
