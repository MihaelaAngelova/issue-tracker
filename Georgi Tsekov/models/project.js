const mongoose = require('mongoose');
const User = require('./models/user');
const Ticket = require('./models/ticket');

const projectSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is a required field'],
        maxlength: [100,'Name cannot exceed 100 characters']
    },
    summary:{
        type: String
    },
    description:{
        type: String
    },
    createdOn:{
        type: Date,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate:{
        type: Date
    },
    targetEndDate:{
        type: Date
    },
    actualEndDate:{
        type: Date
    },
    modifiedOn: {
        type: Date
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    managers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

const model = mongoose.model('Project', projectSchema);

module.exports = model;