const User = require('../models/user');
const Patient = require('../models/patient');

module.exports = {
  create,
  show
}

function create(req, res) {
  req.body.user = req.user._id;
  const patient = new Patient(req.body);
  patient.save(function(err) {
    if(err) return res.render('patients/new');
    res.redirect(`patients/${patient._id}`);
  });
}

function show(req, res) {
  Patient.find({ user: req.user._id }, function(err, patients) {
      if(!patients.length) {
      res.render('patients/new', { title: 'New Patient' })
    } else {
        res.render('patients/show', {
          title: 'Patient Portal - Doctor Express',
          patient: patients[0]
        })
    }
  })
}
