const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: String,
  googleId: {
    type: String,
    required: true
  },
  name: String,
  onboard: {
    type: Boolean,
    required: true,
    default: false
  },
  role: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
