const User = require('../models/user');

module.exports = {
	show
};

async function show (req, res) {
	const patient = await User.findOne({ _id: req.user._id });
	res.render('users/patients/show', { title: "Patient Dashboard | Doctor Express", user: patient });
}
