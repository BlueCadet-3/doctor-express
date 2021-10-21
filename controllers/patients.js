const User = require('../models/user');

module.exports = {
	show
};

async function show (req, res) {
	const patient = await User
		.findById(req.user._id)
		.populate([{
			path: "patient.medications",
			model: "Medication"
		}, {
			path: "patient.notes",
			model: "Note"
		}
		])
		.exec();
	console.log(":::showPatient", patient);
	res.render('users/patients/show', {
		title: "Patient Dashboard | Doctor Express",
		user: patient
	});
}
