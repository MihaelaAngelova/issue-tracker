const express = require('express');
const router = express.Router();
const path = require('path'); // working with file and directory paths.
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user');
const initializePassport = require('../middleware/passport_config');
const checkAuthenticated = require('../middleware/check_authenticated');
const checkNotAuthenticated = require('../middleware/check_not_authenticated');

//const auth_controller = require('../controller/auth_controller');

dotenv.config();

initializePassport(passport);

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { firstName: req.user.firstName, lastName: req.user.lastName });
});

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

router.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup.ejs', { messages: '' });
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/signup', checkNotAuthenticated, async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, password2 } = req.body;
    //const user = await User.findOne({ email: email });

    var messages = [];

    if(await User.findOne({ username: username })) {
      messages.push('This username is already taken');
    }

    if (await User.findOne({ email: email })) {
      messages.push('This email is already taken');
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      messages.push('Email is not valid');
    }

    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(password)){
      messages.push('Password is not valid. The password must be at least 8 characters, ' +
                        'must contain at least one number, and both upper and lowercase letters');
    }

    if(password !== password2){
      messages.push('Passwords do not match');
    }

    console.log(messages);

    if(messages.length > 0){
        return res.status(400).render('signup', { messages: messages.join('; ') });
    }

    console.log('Signup requst received');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    await User.create({ username, firstName, lastName, email, password: hashedPassword });

    console.log('User added to the database');

    res.redirect('/login');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;