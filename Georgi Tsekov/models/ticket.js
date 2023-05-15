const mongoose = require('mongoose');
const User = require('./models/user');

function arrayLimit(val) {
    return val.length <= 50;
}

const ticketSchema = new mongoose.Schema({
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
    progress:{
        type: String
    },
    priority:{
        type:String,
        enum:['Lowest','Low','Medium','High','Highest','None'],
        required: true
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
    status:{
        type: String,
        enum: ['In progress', 'Done', 'Cancelled', 'Open'],
        required: true
    },
    modifiedOn: {
        type: Date
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: [arrayLimit, '{PATH} exceeds the limit of 50']
      }]
});

const model = mongoose.model('Ticket', ticketSchema);

module.exports = model;
