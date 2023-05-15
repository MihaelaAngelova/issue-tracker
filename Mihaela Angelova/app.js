require('dotenv').config()
const morgan = require('morgan');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ticketRoutes = require('./ticketRequests');
const mongoDBUrl = process.env.DATABASE_CREDENTIALS;

mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());
app.use('/tickets', ticketRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});
module.exports = app;
