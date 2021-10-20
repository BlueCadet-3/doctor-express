const express = require('express');
const router = express.Router();

const doctorCtrl = require('../controllers/doctors');

router.get('/:id', doctorCtrl.show);

module.exports = router;
