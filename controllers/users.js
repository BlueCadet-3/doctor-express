const doctorCtrl = require('../controllers/doctors');
const patientCtrl = require('../controllers/patients');

module.exports = {
	showOnboard,
	handleOnboard
};

async function showOnboard (req, res) {
	if (req.user.onboard === false) {
		res.render('users/onboard', { title: "User Onboarding | Doctor Express" });
	} else {
		res.redirect(`/users/${req.user.role}/${req.user._id}`);
	}
}

async function handleOnboard (req, res) {
	if (req.body.role === "doctor") {
		doctorCtrl.create(req, res);
	} else if (req.body.role === "patient") {
		patientCtrl.create(req, res);
	}
}
