const Patient = require('../models/patient');

module.exports = {
  show
}

function show(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    Patient.find({ notes: {} }, function(err, notes) {
      res.render('patients/show', {title: 'Patient Portal - Doctor Express', patient, notes})
    });
  });
}
