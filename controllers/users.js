const User = require('../models/user');

module.exports = {
	showOnboard,
	handleOnboard
};

async function showOnboard (req, res, next) {
	console.log(":::showOnboard", req.user);
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

async function userExists (req) {
	const user = await User.exists({ _id: req.user._id });
	return user;
}

async function createPatient (req, res) {
	const user = await User.findOne({ _id: req.user._id });
	user.role = "patient";
	user.patient = {
		birthDate: req.body.birthDate,
		bloodyType: req.body.bloodType,
		height: req.body.height,
		medications: [],
		notes: [],
		weight: req.body.weight
	};
	user.onboard = true;
	console.log(":::::::user", user);
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/patient/${req.user._id}`);
	}, { new: true });
}

async function createDoctor (req, res) {
	console.log(":::createDoctor", req.body);
	const user = await User.findOne({ _id: req.user._id });
	user.role = "doctor";
	user.onboard = true;
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/doctor/${req.user._id}`);
	}, { new: true });
}
