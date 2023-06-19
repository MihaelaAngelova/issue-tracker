const express = require('express');
const router = express.Router();
const path = require('path'); // working with file and directory paths.
const dotenv = require('dotenv');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//const nodemailer = require('nodemailer');
const User = require('../models/user');

//const reset_password_controller = require('../controller/reset_password_controller');

dotenv.config();
/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});*/

router.get('/new_password_verification', (req, res) => {
    res.render('new_password_verification.ejs', {messages: ''});
});

router.post('/new_password_verification', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).render('new_password_verification', { messages: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
/*
    const emailContent = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Reset password',
      html: `<p>Hi ${user.name},</p>
        <p>You recently requested to reset your password. Please click on the link below to reset your password:</p>
        <a href="http://${req.headers.host}/new_password/${token}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>`
    };

    transporter.sendMail(emailContent, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
*/
    //res.status(200).send('Email for resetting your password has been sent');
    res.redirect(`/new_password/${token}`);

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/new_password/:token', async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      //return res.status(404).send('Invalid or expired token');
      return res.status(404).render('invalid_or_expired_token.ejs');
    }

    res.render('new_password', { messages: '', token: token });

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/new_password/:token', async (req, res) => {
  try{
    const token = req.params.token;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    var messages = [];

    if (!user) {
      //return res.status(404).send('Invalid or expired token');
      return res.status(404).render('invalid_or_expired_token.ejs');
    }

    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(req.body['new-password'])){
      messages.push('Password is not valid. The password must be at least 8 characters, must contain at least one number, and both upper and lowercase letters');
    }

    if (req.body['new-password'] !== req.body['new-password2']) {
      messages.push('Passwords do not match');
    }

    console.log(messages);

    if(messages.length > 0){
      return res.status(400).render('new_password', { messages: messages.join('; '), token: token });
    }

    const hashedPassword = await bcrypt.hash(req.body['new-password'], 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    //res.send('Password has been reset successfully');
    res.redirect('/new_password_confirmation');

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//router.get('/new_password/expired_token', (req, res) => {
//    res.render('invalid_or_expired_token.ejs');
//});

//router.post('/new_password/expired_token', (req, res) => {
//  res.redirect('/login');
//});

router.get('/new_password_confirmation', (req, res) => {
  res.render('new_password_confirmation.ejs');
});

router.post('/new_password_confirmation', (req, res) => {
  res.redirect('/login');
});

module.exports = router;