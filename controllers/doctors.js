const User = require('../models/user');

module.exports = {
	create,
	show
};

async function create (req, res) {
	console.log(":::createDoctor", req.body);
	const user = await User.findById(req.user._id);
	user.role = "doctors";
	user.onboard = true;
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/${user.role}/${req.user._id}`);
	}, { new: true });
}

async function show (req, res) {
	const doctor = await User.findOne({ _id: req.user._id });
	console.log(":::doctorShow", doctor);
	res.render('users/doctors/show', { title: "Patient Dashboard | Doctor Express", user: doctor });
}
