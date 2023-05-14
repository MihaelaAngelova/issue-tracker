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

router.delete('/:ticketId', async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      res.status(404).json({
        error: 'Ticket with id ${ticketId} not found.',
      });
    } else {
      res.status(200).json({
        message: 'Ticket with id ${ticketId} was deleted successfully.',
        deletedTicket,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete ticket with id ${ticketId}.',
      newError: error,
    });
  }
});

router.get('/:ticketId', async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      res.status(404).json({
        error: 'Ticket with id ${ticketId} not found.',
      });
    }
    
    res.status(200).json(ticket);

  } catch (error) {
    res.status(500).json({
      error: 'Failed to get ticket with id ${ticketId}.',
      newError: error,
    });
  }
});

router.put('/:ticketId', async (req, res) => {
  const ticketId = req.params.ticketId;
  const updatedTicket = req.body;

  try {
    const validationResult = ticketValidationSchema.validate(updatedTicket);

    if (validationResult.error) {
      res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      updatedTicket,
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({
        error: 'Ticket with id ${ticketId} not found.',
      });
    }

    res.status(200).json({
      message: 'Ticket with id ${ticketId} was updated.',
      ticket,
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to update ticket with id ${ticketId}',
      newError: error,
    });
  }
});

module.exports = router;
