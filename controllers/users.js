

module.exports = {
	showOnboard,
	handleOnboard
};

async function showOnboard (req, res) {
	if (req.user.onboard === false) {
		console.log(":::showOnboardFalse", req.user);
		res.render('users/onboard', { title: "User Onboarding | Doctor Express" });
	} else {
		res.redirect('/');
	}
}

async function handleOnboard (req, res) {
	console.log(":::handleOnboard", req.body, req.user);
	if (req.body.role === "doctor") {
		console.log(":::handleDoctor");
	} else if (req.body.role === "patient") {
		console.log(":::handlePatient");
	}
}
