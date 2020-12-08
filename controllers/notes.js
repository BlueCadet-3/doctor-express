const Patient = require('../models/patient');

module.exports = {
  create,
  update,
  delete: deleteNote
};

function create(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    patient.notes.push(req.body);
    patient.save(function(err) {
      res.redirect(`/patients/${patient._id}`);
    });
  });
}

function update(req, res) {
  Patient.findOne({'notes._id': req.params.id}, function(err, patient) {
      let note = puppy.notes.id(req.params.id);
      Object.assign(note, req.body);
      patient.save(function(err) {
          res.redirect(`/patients/${patient._id}`);
      })
  })
}

function deleteNote(req, res, next) {
  Patient.findOne({'notes._id': req.params.id})
  .then(function(patient) {
    const note = patient.notes.id(req.params.id);
    if(!note.user.equals(req.user.id)) return res.redirect(`/patients/${patient._id}`);
    note.remove();
    patient.save().then(function() {
      res.redirect(`/patients/${patient._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}
