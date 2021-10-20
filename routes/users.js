const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.get('/onboard', userCtrl.showOnboard);
router.post('/onboard', userCtrl.handleOnboard);

module.exports = router;
