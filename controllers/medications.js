const Medication = require('../models/medication');
const User = require('../models/user');

module.exports = {
  create,
  delete: deleteMedication
};

async function create (req, res) {
  const user = await User.findOne({ _id: req.user._id });
  const medication = await Medication.create(req.body);
  medication.user = req.user._id;
  console.log(":::medication", medication);
  user.patient.medications.unshift(medication._id);
  user.save().then(function () {
    res.redirect(`/users/${user.role}/${user._id}`);
  });
}

function deleteMedication (req, res, next) {
  Patient.findOne({ 'medications._id': req.params.id })
    .then(function (patient) {
      const medication = patient.medications.id(req.params.id);
      if (!medication.user.equals(req.user._id)) return res.redirect(`/patients/${patient._id}`);
      medication.remove();
      patient.save().then(function () {
        res.redirect(`/patients/${patient._id}`);
      }).catch(function (err) {
        return next(err);
      });
    });
}
