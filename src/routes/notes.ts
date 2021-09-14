const notesCtrl = require("../controllers/notes");

router.post("/patients/:id/notes", notesCtrl.create);
router.delete("/notes/:id", notesCtrl.delete);
router.put("/notes/:id", notesCtrl.update);

module.exports = router;
