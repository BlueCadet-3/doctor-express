const User = require('../models/user');

module.exports = {
	showOnboard,
	handleOnboard
};

async function showOnboard (req, res, next) {
	if (req.user.onboard === false) {
		res.render('users/onboard', { title: "User Onboarding | Doctor Express" });
	} else {
		res.redirect(`/users/${req.user.role}/${req.user._id}`);
	}
}

async function handleOnboard (req, res) {
	if (req.body.role === "doctor") {
		createDoctor(req, res);
	} else if (req.body.role === "patient") {
		createPatient(req, res);
	}
}

// Helper functions

async function createPatient (req, res) {
	const user = await User.findById(req.user._id);
	user.role = "patients";
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

async function createDoctor (req, res) {
	console.log(":::createDoctor", req.body);
	const user = await User.findById(req.user._id);
	user.role = "doctors";
	user.onboard = true;
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/${user.role}/${req.user._id}`);
	}, { new: true });
}
