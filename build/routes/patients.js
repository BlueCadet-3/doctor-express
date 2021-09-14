var express = require('express');
var router = express.Router();
var patientsCtrl = require('../controllers/patients');
router.post('/', patientsCtrl.create);
router.get('/:id', patientsCtrl.show);
module.exports = router;
