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

// function update(req, res) {
//   Patient.findOne({'notes._id': req.params.id}, function(err, patient) {
//       let note = patient.notes.id(req.params.id);
//       Object.assign(note, req.body);
//       patient.save(function(err) {
//           res.redirect(`/patients/${patient._id}`);
//       })
//   })
// }

// function update(req, res) {
//   Patient.findByIdAndUpdate(
//     {_id: req.params._id, user: req.user._id},
//     // Update object with updated properties
//     req.body,
//     // Options object with new: true to make sure updated doc is returned
//     {new: true},
//     function(err, patient) {
//       if(err || !patient) return res.redirect(`/patients/${patient._id}`);
//       res.redirect(`patients/${patient._id}`);
//     }
//   );
// }

function update(req, res) {
  // Using dot syntax to query on the property of a subdoc
  Patient.findOne({'notes._id': req.params.id}, function(err, patient) {
    // Find the comment subdoc using the id method on Mongoose arrays
    const noteSubdoc = patient.notes.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    // console.log(req.params.id);
    // console.log(req.user._id);
    // if(!noteSubdoc.userId.equals(req.user._id)) return res.redirect(`/patients/${patient._id}`);
    // Update the text of the comment
    console.log(req.body.text);
    console.log(req.params.id);
    noteSubdoc.note = req.body.text;
    console.log(noteSubdoc.text);
    // Save the updated patient
    patient.save(function(err) {
      // Redirect back to the patient's show view
      res.redirect(`/patients/${patient._id}`);
    });
  });
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
