const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	note: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
