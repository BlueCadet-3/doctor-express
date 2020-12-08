const express = require('express');
const router = express.Router();

const notesCtrl = require('../controllers/notes');

router.post('/patients/:id/notes', notesCtrl.create);
router.delete('/notes/:id', notesCtrl.delete);
router.patch('/notes/:id', notesCtrl.update);

module.exports = router;
