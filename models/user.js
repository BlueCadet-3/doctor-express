const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
	avatar: String,
	id: String,
	platform: String,
	verified: Boolean
}, { _id: false });

const nameSchema = new Schema({
	first: String,
	last: String,
	display: String
}, { _id: false });

const doctorSchema = new Schema({

}, { _id: false });

const patientSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	birthDate: Date,
	bloodType: {
		type: String,
		enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown']
	},
	height: Number,
	medications: [{
		type: Schema.Types.ObjectId,
		ref: 'Medication'
	}],
	notes: [{
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}],
	weight: Number,
}, { timestamps: true });

patientSchema.virtual('getAge').get(function () {
	const today = new Date();
	const dob = this.birthDate;
	const age = today.getFullYear() - dob.getFullYear();
	const month = today.getMonth() - dob.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
		age--;
	}
	return `${age} years, ${month} months`;
});

const userSchema = new Schema({
	auth: authSchema,
	email: String,
	name: nameSchema,
	onboard: {
		type: Boolean,
		required: true,
		default: false
	},
	role: {
		default: 'none',
		enum: ['doctors', 'none', 'patients'],
		type: String,
		required: true
	},
	patient: patientSchema
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
