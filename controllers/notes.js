const Patient = require('../models/patient');

module.exports = {
  // new: newNote,
  create
};

function create(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    patient.notes.push(req.body);
    patient.save(function(err) {
      res.redirect(`/patients/${user._id}`);
    });
  });
}

// function create(req, res) {
//   userId = req.params.id;
//   req.body.user = userId;
//   Note.create(req.body, function(err, note) {
//     console.log(userId + "" + req.body);
//     res.redirect(`/patients/${userId}`);
//   });
// }