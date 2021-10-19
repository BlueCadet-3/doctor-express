const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: String,
  lastName: String,
  birthDate: Date,
  height: Number,
  weight: Number,
  bloodType: String,
  medications: [{
    type: Schema.Types.ObjectId,
    ref: 'Medication',
    required: true,
  }],
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
