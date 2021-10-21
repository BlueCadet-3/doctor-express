const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
	create,
	update,
	delete: deleteNote
};

async function create (req, res) {
	// console.log(":::createNoteStart", note);
	const note = await Note
		.create({
			note: req.body.note,
			user: req.user._id
		});
	const user = await User.findById(req.params.id);
	user.patient.notes.push(note);
	// console.log(":::createNoteEnd", note);
	await user.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/${req.user.role}/${req.user._id}`);
	});
}

async function update (req, res) {
	const update = { note: req.body.text };
	console.log(":::updateNote", req.body);
	console.log(":::updateNote", req.user);
	const note = await Note.findOneAndUpdate({ _id: req.params.id }, update, { new: true });
	await note.save((err) => {
		if (err) return res.render('error/error', { error: err });
		res.redirect(`/users/${req.user.role}/${req.user._id}`);
	});
	console.log(":::updateNote", note);
}

// function update (req, res) {
// 	console.log(":::updateNote");
// 	// Using dot syntax to query on the property of a subdoc
// 	User.findOne({ 'patient.notes._id': req.params.id }, function (err, user) {
// 		// Find the comment subdoc using the id method on Mongoose arrays
// 		const noteSubdoc = patient.notes.id(req.params.id);
// 		// Ensure that the comment was created by the logged in user
// 		// if(!noteSubdoc.userId.equals(req.user._id)) return res.redirect(`/patients/${patient._id}`);
// 		// Update the text of the comment
// 		noteSubdoc.note = req.body.text;
// 		// Save the updated patient
// 		user.save(function (err) {
// 			if (err) return res.render('error/error', { error: err });
// 			// Redirect back to the patient's show view
// 			res.redirect(`/users/${req.user.role}/${user._id}`);
// 		});
// 	});
// }

function deleteNote (req, res, next) {
	Patient.findOne({ 'notes._id': req.params.id })
		.then(function (patient) {
			const note = patient.notes.id(req.params.id);
			if (!note.user.equals(req.user.id)) return res.redirect(`/patients/${patient._id}`);
			note.remove();
			patient.save().then(function () {
				res.redirect(`/patients/${patient._id}`);
			}).catch(function (err) {
				return next(err);
			});
		});
}
