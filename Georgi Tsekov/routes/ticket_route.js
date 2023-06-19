const express = require('express');
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const Ticket = require('../models/ticket');
const Project = require('../models/project');

const checkAuthenticated = require('../middleware/check_authenticated');


router.get('/homepage', checkAuthenticated, async (req, res) => {
  try {
  
  const userUsername = req.user.username;
  const userEmail = req.user.email;
  
  const tickets = await Ticket.find({ $or: [{assignees: userUsername}, {createdBy: userEmail}]});//({ assignees: { $in: [req.user.username] } });
  const projects = await Project.find({ $or: [{employees: userUsername}, {createdBy: userEmail}]});

  res.render('homepage.ejs', {tickets: tickets, projects: projects, firstName: req.user.firstName, lastName: req.user.lastName });
} catch (error) {
  res.status(500).json({ error: 'Failed to retrieve data.', newError: error });
}
});

router.post('/homepage', checkAuthenticated, async (req, res) => {
  try{
      const createdOn = Date.now();
      console.log(req.body.name);
      const createdBy = req.user.email;

      const employees = Array.isArray(req.body.employees) ? req.body.employees : [req.body.employees];
      console.log(employees);
  
      await Project.create({ name: req.body.name, summary: req.body.summary, description: req.body.description, 
                            createdOn: createdOn, createdBy: createdBy, startDate: req.body.startDate, targetEndDate: req.body.targetEndDate, 
                            actualEndDate: req.body.actualEndDate, employees: employees});


      console.log('Project added to the database');

  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/project_dashboard/:project_id', checkAuthenticated, async (req, res) => { //moje tuk da slojim projectID vmesto "/project_dashboard"
    try {
        const tickets = await Ticket.find();
        const projectId = req.params.project_id;

        const project = await Project.findById(projectId);
    
        // Render the template and pass the ticket data
        res.render('project_dashboard.ejs', { tickets: tickets, projectId: projectId, project: project, messages: [] });
        
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }

});

router.post('/project_dashboard/:project_id', checkAuthenticated, async (req, res) => {
  try{

      var messages = [];

      const createdOn = Date.now();
      const createdBy = req.user.email;
      const projectId = req.params.project_id;

      const project = await Project.findById(projectId);
      const tickets = await Ticket.find();

      if(!project){
        return res.status(404).send('Project not found');
      }
      
      const projectName = project.name; //project.projectName

      const assignees = Array.isArray(req.body["assignees"]) ? req.body["assignees"] : [req.body["assignees"]];
      console.log(assignees);

      //tuk trqbwa da slojim proverka dali assigneetata gi ima w tozi proekt izobshto
      const participants = project.employees;
      console.log(participants);

      const assigneesNotExistInProject = assignees.filter((assignee) => !participants.includes(assignee));
      console.log(assigneesNotExistInProject);
      
      if(assigneesNotExistInProject.length > 0) {
        messages.push(`These users: ${assigneesNotExistInProject.join(', ')} are not part of this project.`);
      }

      if(new Date(createdOn) > new Date(req.body.targetEndDate) || new Date(createdOn) > new Date(req.body.actualEndDate)){
        messages.push("Target-end date and actual-end date must be after the current date");
      }

      if(new Date(req.body.targetEndDate) > new Date(req.body.actualEndDate)){
        messages.push("Target-end date must be before or equal to actual-end date");
      }

      if(new Date(req.body.startDate) > new Date(req.body.targetEndDate) || new Date(req.body.startDate) > new Date(req.body.actualEndDate)){
        messages.push("Target-end date and actual-end date must be after the start date");
      }

      console.log(messages);

      if(messages.length > 0){
        return res.status(400).render('project_dashboard', { tickets: tickets, project: project, projectId: projectId, messages: messages.join('; ') });
      }

      await Ticket.create({ name: req.body.name, projectName: projectName, priority: req.body.priority, summary: req.body.summary, description: req.body.description, 
                            createdOn: createdOn,createdBy: createdBy, targetEndDate: req.body.targetEndDate, 
                            status: req.body.status, assignees: assignees});

      console.log('Ticket added to the database');
      //res.render('project_dashboard.ejs', { tickets: tickets, projectId: projectId, project: project, messages: [] });

  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/view_by_assignee/:project_id', checkAuthenticated, async (req, res) => {
  try {

    const projectId = req.params.project_id;
    const project = await Project.findById(projectId);

    // Fetch the tickets from the database
    const tickets = await Ticket.find();

    const ticketsData = await Ticket.find({}).lean();

    const assignees = ticketsData.flatMap(ticket => ticket.assignees).flat();

    //const assignees = tickets.assignees;
    //console.log(assignees);

    // Render the template and pass the ticket data
    res.render('view_by_assignee.ejs', { tickets: tickets, projectId: projectId, project: project, assignees: assignees });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/view_by_assignee/:project_id', checkAuthenticated,  async (req, res) => {
  try {

    const projectId = req.params.project_id;
    const project = await Project.findById(projectId);
    
    // Fetch the tickets from the database
    const tickets = await Ticket.find();

    const ticketsData = await Ticket.find({}).lean();

    const assignees = ticketsData.flatMap(ticket => ticket.assignees).flat();

    // Render the template and pass the ticket data
    res.render('view_by_assignee.ejs', { tickets: tickets, projectId: projectId, project: project, assignees: assignees });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

  
module.exports = router;