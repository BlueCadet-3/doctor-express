var express = require('express');
var router = express.Router();
var medicationsCtrl = require('../controllers/medications');
router.post('/patients/:id/medications', medicationsCtrl.create);
router.delete('/medications/:id', medicationsCtrl.delete);
module.exports = router;