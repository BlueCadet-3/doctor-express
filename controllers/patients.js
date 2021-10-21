const User = require('../models/user');

module.exports = {
	create,
	show
};

async function create (req, res) {
	const user = await User.findById(req.user._id);
	user.role = 'patients';
	user.patient = {
		birthDate: req.body.birthDate,
		bloodType: req.body.bloodType,
		height: req.body.height,
		medications: [],
		notes: [],
		user: req.user._id,
		weight: req.body.weight
	};
	user.onboard = true;
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/${user.role}/${req.user._id}`);
	}, { new: true });
}

async function show (req, res) {
	const patient = await User
		.findById(req.user._id)
		.populate([{
			path: 'patient.medications',
			model: 'Medication'
		}, {
			path: 'patient.notes',
			model: 'Note'
		}
		])
		.exec();
	res.render('users/patients/show', {
		title: 'Patient Dashboard | Doctor Express',
		user: patient
	});
}
