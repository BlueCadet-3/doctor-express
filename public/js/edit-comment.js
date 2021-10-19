function editNote(editNoteId) {
  let editNote = document.getElementById(editNoteId);
  if (editNote.style.display === "none") {
    editNote.style.display = "block";
  } else {
    editNote.style.display = "none";
  }
}
