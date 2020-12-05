const User = require('../models/user');
const Patient = require('../models/patient');

module.exports = {
  new: newPatient,
  show
}

function newPatient(req, res) {
  if(Patient.findById !== )
  res.render('patients/new', { title: 'New Patient Form'});
}

function show(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    res.render('patients/show', {
    title: 'Patient Portal - Doctor Express',
    patient
    });
  });
}

// function show(req, res) {
//   Patient.findById(req.params.id)
//   .populate('notes').exec(function(err, patient) {
//     res.render('patients/show', { title: 'Notes?', patient});
//   });
// }
