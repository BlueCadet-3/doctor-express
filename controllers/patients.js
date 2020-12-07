const Patient = require('../models/patient');

module.exports = {
  create,
  show
}

function create(req, res) {
  const patient = new Patient(req.body);
  patient.save(function(err) {
    if(err) return res.render('patients/new');
    res.redirect(`patients/show`);
  });
}

function show(req, res) {
  Patient.find({ user: req.user._id }, function(err, patients) {
    console.log(req.user._id);
    // if(req.user._id !== patient._id) {
      if(!patients.length) {
      res.render('patients/new', { title: 'New Patient' })
    } else {
        res.render('patients/show', {
          title: 'Patient Portal - Doctor Express',
          patient: patients[0]
          // user: req.user._id
        })
    }
  })
}

// function show(req, res) {
  //   Patient.findById(req.params.id, function(err, patient) {
    //     Patient.find({ notes: {} }, function(err, notes) {
      //       res.render('patients/show', {title: 'Patient Portal - Doctor Express', patient, notes})
      //     });
      //   });
// }

// function create(req, res) {
//   patientId = req.params.id;
//   req.body.user = req.user._id;
//   Patient.create(req.body, function(err, patient) {
//     res.redirect(`/patients/${patientId}`);
//   });
// }

