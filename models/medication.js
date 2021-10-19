const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	dosage: String,
	frequency: String,
	notes: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Medication', medicationSchema);
