const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is a required field'],
        maxlength: [100,'Name cannot exceed 100 characters']
    },
    projectName:{
        type: String,
        required: [true, 'projectName is a required field'],
        maxlength: [100, 'projectName cannot exceed 100 characters']
    },
    summary:{
        type: String
    },
    description:{
        type: String
    },
    progress:{
        type: String
    },
    priority:{
        type:String,
        enum:['Lowest','Low','Medium','High','Highest','None'],
        required: [true,'priority is a required field']
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
    status:{
        type: String,
        enum: ['In Progress', 'Done', 'Cancelled', 'Open'],
        required: [true,'status is a required field']
    },
    modifiedOn: {
        type: Date
    },
    modifiedBy: {
        type: String,
        maxlength:[50, 'modifiedBy cannot exceed 50 characters']
    },
    assignees:{
        type: [{
           type: String,
           maxlength:[50,'assignees item cannot exceed 50 characters']
        }],
        validate: [arrayMax, '{PATH} exceeds the limit of 50']
    }
});

function arrayMax(val) {
    return val.length <= 50;
}

const model = mongoose.model('Ticket', ticketSchema);

module.exports = model;
