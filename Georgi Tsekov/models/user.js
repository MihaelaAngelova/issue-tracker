const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type:String,
        required: true
        //unique: true
    },
    password:{
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const model = mongoose.model('User', userSchema);

module.exports = model;