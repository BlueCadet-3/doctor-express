const Patient = require('../models/patient');

module.exports = {
  show
}

function show(req, res) {
  Patient.findById(req.params.id, function(err, patient) {
    Note
    res.render('patients/show', {title: 'Patient Portal - Doctor Express', patient})
  });
}
