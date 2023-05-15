import * as mongoose from 'mongoose';
const User = require('users');
const Ticket = require('tickets');

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
        type: User,
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
        type: User
    },
    employees: {
        type: [User]
    },
    tickets: {
        type: [Ticket]
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;