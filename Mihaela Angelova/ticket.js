const mongoose = require('mongoose');
const User = require('./user');

const ticketSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Name is a required field'],
        maxlength: [100, 'Name cannot exceed 100 characters']
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
      type: Object
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
      type: Object
    },
    assignees:[{
      type: Object,
      validate: [arrayLimit, '{PATH} exceeds the limit of 50']
    }]
});

function arrayLimit(val) {
    return val.length <= 50;
}

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;