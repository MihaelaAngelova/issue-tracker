const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        maxlength:[50, 'username cannot exceed 50 characters'],
        required: [true,'username is a required field'],
        unique: [true,'username is a unique field']
    },
    firstName:{
        type:String,
        maxlength:[50, 'firstName cannot exceed 50 characters'],
        required: [true,'firstName is a required field']
    },
    lastName:{
        type:String,
        maxlength:[50, 'lastName cannot exceed 50 characters'],
        required: [true,'lastName is a required field']
    },
    email:{
        type:String,
        validate:{
            validator: function(value){
                return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
            },
            message: props=>`${props.value} is not a valid email address`
        },
        required:[true,'email is a required field'],
        unique:[true, 'email is a unique field']
    },
    password:{
        type:String,
        minlength:[8, 'password must be at least 8 characters long'],
        required: [true,'password is a required field'],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const model = mongoose.model('User', userSchema);

module.exports = model;
