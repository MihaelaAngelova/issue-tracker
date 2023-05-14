const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is a required field'],
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is a required field'],
    maxlength: [50, 'Last name cannot be more than 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    unique: true,
    validate: {
      validator: (value) => value.isEmail(),
      message: 'Incorrect email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [50, 'Password cannot be more than 50 characters long']
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
