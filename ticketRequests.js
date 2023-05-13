const express = require('express');
const app = express();
const Ticket = require('./ticket');
const ticketValidationSchema = require('./ticketValidationSchema');

app.post('/tickets', async (req, res) => {
    try {
      const newTicket = req.body;
      const validationResult = ticketValidationSchema.validate(newTicket);
      if (validationResult.error) {
        res.status(400).json({ error: validationResult.error.details[0].message });
      } else {
        const createdTicket = await Ticket.create(newTicket);
        res.status(201).json({
          message: 'A new ticket was created.',
          createdTicket
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the ticket.' });
    }
  });
  
/*
app.delete('/tickets/:id', (req, res) => {
    const { id } = req.params;
  
    // Your code to find the ticket with the given ID and delete it from the database goes here
    // Make sure to handle errors if the ticket is not found
  
    // Return a success message as a response
    res.json({ message: `Ticket ${id} deleted successfully` });
  });
*/

