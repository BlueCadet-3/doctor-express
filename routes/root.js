const express = require('express');
const router = express.Router();

const rootCtrl = require('../controllers/root');

router.get('/', rootCtrl.showIndex);

module.exports = router;
