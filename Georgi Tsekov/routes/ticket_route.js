const express = require('express');
const router = express.Router();
const path = require('path'); // working with file and directory paths.
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const Ticket = require('../models/ticket');


router.get('/project_dashboard', async (req, res) => { //moje tuk da slojim projectID vmesto "/project_dashboard"
    try {
        // Fetch the tickets from the database
        const tickets = await Ticket.find();
    
        // Render the template and pass the ticket data
        res.render('project_dashboard.ejs', { tickets });
        
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
})

router.post('/project_dashboard', async (req, res) => {
    try{
        const createdOn = Date.now();

        //const ticketsCollection = db.collection('tickets');
        const projectName = "blabla";

        const assignees = Array.isArray(req.body.assignees) ? req.body.assignees : [req.body.assignees];

        //tuk trqbwa da slojim proverka dali assigneetata gi ima w tozi proekt izobshto

        await Ticket.create({ name: req.body.name, projectName: projectName, priority: req.body.priority, summary: req.body.summary, description: req.body.description, 
                              createdOn: createdOn,createdBy: req.body.createdBy, targetEndDate: req.body.targetEndDate, 
                              status: req.body.status, assignees: assignees});

        //console.log('Assignees:', assignees);

        console.log('Ticket added to the database');

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    //var newTicket = req.body;
    //
    //var reqEmail = req.body.createdBy;
    //
    //if (validationResult.error) {
    //  res.status(400).json({
    //    error: validationResult.error.details[0].message
    //  });
    //}
    //
    //if(!await User.findOne({ email: reqEmail.email })) {
    //  res.status(404).json({
    //    message: 'Email not found.'
    //  })
    //}
    //
    //try {
    //  const createdTicket = await Ticket.create(newTicket);
    //  res.status(201).json({
    //    message: 'A new ticket was created.',
    //    createdTicket
    //  });
    //} catch (error) {
    //    res.status(500).json({ 
    //    newError: error 
    //  });
    //}
  });

router.get('/view_by_assignee', async (req, res) => {
  try {
    // Fetch the tickets from the database
    const tickets = await Ticket.find();

    const ticketsData = await Ticket.find({}).lean();

    const assignees = ticketsData.flatMap(ticket => ticket.assignees).flat();

    //const assignees = tickets.assignees;
    //console.log(assignees);

    // Render the template and pass the ticket data
    res.render('view_by_assignee.ejs', { tickets: tickets, assignees: assignees });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/view_by_assignee', async (req, res) => {
  try {
    // Fetch the tickets from the database
    const tickets = await Ticket.find();

    const ticketsData = await Ticket.find({}).lean();

    const assignees = ticketsData.flatMap(ticket => ticket.assignees).flat();

    // Render the template and pass the ticket data
    res.render('view_by_assignee.ejs', { tickets: tickets, assignees: assignees });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

  
module.exports = router;