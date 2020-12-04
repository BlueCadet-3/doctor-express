const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId, 
    ref: 'Patient'
  },
  name: String,
  dosage: String,
  frequency: String,
  notes: String
}, {
  timestamps: true
});

const noteSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId, 
    ref: 'Patient'
  },
  note: String
}, {
  timestamps: true
});

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  height: Number,
  weight: Number,
  bloodType: String,
  medications: [medicationSchema],
  notes: [noteSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
