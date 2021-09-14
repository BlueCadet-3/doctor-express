function editNote(editNoteId) {
    var editNote = document.getElementById(editNoteId);
    if (editNote.style.display === "none") {
        editNote.style.display = "block";
    }
    else {
        editNote.style.display = "none";
    }
}
