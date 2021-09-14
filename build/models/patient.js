var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var medicationSchema = new Schema({
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
var noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    note: String
}, {
    timestamps: true
});
var patientSchema = new Schema({
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
    medications: [medicationSchema],
    notes: [noteSchema]
}, {
    timestamps: true
});
module.exports = mongoose.model('Patient', patientSchema);
