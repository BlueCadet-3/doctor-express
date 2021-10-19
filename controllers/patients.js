const User = require('../models/user');
const Patient = require('../models/patient');

module.exports = {
	create,
	show
};

async function create (req, res) {
	req.user.onboard = true;
	const patient = new Patient(req.body);
	patient.medications = [];
	patient.notes = [];
	console.log(":::postPatient", patient);
	patient.save(function (err) {
		if (err) return res.render('error', { error: err });
		res.render('patients/show', { title: "Patient Portal | Doctor Express", patient: patient });
	});
}

async function show (req, res) {
	const patient = await Patient.find({ user: req.user._id }).populate(['medications', 'notes']);
	console.log(":::patient", patient);
	if (patient.onboard === false) {
		res.render('patients/new', { title: "New Patient | Doctor Express" });
	} else {
		res.render('patients/show', { title: "Patient Portal | Doctor Express", patient: patient });
	}
}

// function show(req, res) {
//   Patient.find({ user: req.user._id }, function(err, patients) {
//     if(!patients.length) {
//       res.render('patients/new', { title: 'New Patient' })
//     } else {
//         res.render('patients/show', {
//           title: 'Patient Portal - Doctor Express',
//           patient: patients[0]
//         })
//     }
//   })
// }
