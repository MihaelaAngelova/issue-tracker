const Joi = require('joi');

const ticketValidationSchema = Joi.object({
  name: Joi.string().required(),
  summary: Joi.string(),
  description: Joi.string(),
  progress: Joi.string(),
  priority: Joi.string().valid('Lowest', 'Low', 'Medium', 'High', 'Highest', 'None').required(),
  createdOn: Joi.date().required(),
  createdBy: Joi.object().required(),
  startDate: Joi.date(),
  targetEndDate: Joi.date(),
  actualEndDate: Joi.date(),
  status: Joi.string().valid('In progress', 'Done', 'Cancelled', 'Open').required(),
  modifiedOn: Joi.date(),
  modifiedBy: Joi.object(),
  assignees: Joi.array().items(Joi.object()).max(50)
});

module.exports = ticketValidationSchema;
