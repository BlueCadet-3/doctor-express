function editNote (editNoteId) {
  const editNote = document.getElementById(editNoteId);
  const spanNote = document.getElementById(`span-${editNoteId}`);
  console.log(":::editNote", editNote);
  console.log(":::editNote", spanNote.style);
  if (editNote.style.display === "none") {
    editNote.style.display = "block";
    spanNote.style.display = "none";
  } else {
    editNote.style.display = "none";
    spanNote.style.display = "block";
  }
}
