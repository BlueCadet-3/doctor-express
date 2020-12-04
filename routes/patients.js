const express = require('express');
const router = express.Router();

const patientsCtrl = require('../controllers/patients');

router.get('/:id', patientsCtrl.show);

module.exports = router;