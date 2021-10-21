const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
	create,
	update,
	delete: deleteNote
};

async function create (req, res) {
	const doc = {
		note: req.body.note,
		user: req.params.id
	};
	const note = await Note.create(doc);
	const filter = { _id: req.params.id };
	const user = await User.findOne(filter);
	user.patient.notes.unshift(note);
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect('back');
	});
}

async function update (req, res) {
	const filter = { _id: req.params.id };
	const update = { note: req.body.text };
	const options = { new: true };
	const note = await Note.findOneAndUpdate(filter, update, options);
	await note.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect('back');
	});
}

async function deleteNote (req, res) {
	const filter = { _id: req.params.id };
	const options = {};
	await Note.findOneAndDelete(filter, options);
	res.redirect('back');
}
