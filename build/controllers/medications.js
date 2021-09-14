var Patient = require('../models/patient');
module.exports = {
    create: create,
    delete: deleteMedication
};
function create(req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        req.body.user = req.user.id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        patient.medications.push(req.body);
        patient.save(function (err) {
            res.redirect("/patients/" + patient._id);
        });
    });
}
function deleteMedication(req, res, next) {
    Patient.findOne({ 'medications._id': req.params.id })
        .then(function (patient) {
        var medication = patient.medications.id(req.params.id);
        if (!medication.user.equals(req.user._id))
            return res.redirect("/patients/" + patient._id);
        medication.remove();
        patient.save().then(function () {
            res.redirect("/patients/" + patient._id);
        }).catch(function (err) {
            return next(err);
        });
    });
}
