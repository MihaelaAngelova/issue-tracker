const express = require('express');
const router = express.Router();
const Ticket = require('./ticket');
const ticketValidationSchema = require('./ticketValidationSchema');

router.post('/', async (req, res) => {
  var newTicket = req.body;
  var validationResult = ticketValidationSchema.validate(newTicket);
  if (validationResult.error) {
    res.status(400).json({ error: validationResult.error.details[0].message });
  }
  try {
    const createdTicket = await Ticket.create(newTicket);
    res.status(201).json({
      message: 'A new ticket was created.',
      createdTicket
    });
  } catch (error) {
    console.log(validationResult);
    res.status(500).json({ 
      newError: error
    });
  }
});

/*
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (deletedTicket) {
      res.json({ message: `Ticket ${id} deleted successfully` });
    } else {
      res.status(404).json({ error: `Ticket ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
  }
});
*/

module.exports = router;
