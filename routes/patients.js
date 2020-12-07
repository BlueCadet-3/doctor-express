const express = require('express');
const router = express.Router();

const patientsCtrl = require('../controllers/patients');

// router.get('/', patientsCtrl.index);
router.post('/', patientsCtrl.create);
router.get('/:id', patientsCtrl.show);

module.exports = router;
