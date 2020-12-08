const express = require('express');
const router = express.Router();

const medicationsCtrl = require('../controllers/medications');

router.post('/patients/:id/medications', medicationsCtrl.create);
router.delete('/medications/:id', medicationsCtrl.delete);

module.exports = router;
