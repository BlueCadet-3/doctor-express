const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

//   firstName: String,
//   lastName: String,
//   birthDate: Date,
//   height: Number,
//   weight: Number,
//   bloodType: String,
//   medications: [],
//   notes: []
// }, {
//   timestamps: true
// });