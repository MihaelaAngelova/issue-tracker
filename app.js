require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoDBUrl = process.env.DATABASE_CREDENTIALS;
mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


/*
// update a ticket
app.put('/tickets/id', (req, res) => {
    const id = req.params.id;
    Ticket.findByIdAndUpdate(id, { $set: req.body }, (err, ticket) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('Ticket updated!');
        }
      });
})
*/

module.exports = app;