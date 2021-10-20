const User = require('../models/user');

module.exports = {
	show
};

async function show (req, res) {
	const doctor = await User.findOne({ _id: req.user._id });
	console.log(":::doctorShow", doctor);
	res.render('users/doctors/show', { title: "Patient Dashboard | Doctor Express", user: doctor });
}
