const express = require('express');
const router = express.Router();

const patientsCtrl = require('../controllers/patients');

// router.get('/', patientsCtrl.index);
router.get('/:id', patientsCtrl.show);

module.exports = router;
