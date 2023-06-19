const mongoose = require('mongoose');

function arrayMin(val) {
    return val.length >= 1;
}

const projectSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is a required field'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
        unique: [true, 'name is a unique field']
    },
    summary:{
        type: String
    },
    description:{
        type: String
    },
    createdOn:{
        type: Date,
        required: [true,'createdOn is a required field']
    },
    createdBy:{
        type: String,
        required: [true,'createdBy is a required field'],
        maxlength:[50,'createdBy cannot exceed 50 characters']
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
        type: String,
        maxlength:[50,'modifiedBy cannot exceed 50 characters']
    },
    employees: {
        type: [{
            type: String,
            maxlength:[50,'employees item cannot exceed 50 characters']
        }],
        required:[true,'employees is a required field'],
        validate: [arrayMin, '{PATH} must have at least 1 item']
    }
});

const model = mongoose.model('Project', projectSchema);

module.exports = model;