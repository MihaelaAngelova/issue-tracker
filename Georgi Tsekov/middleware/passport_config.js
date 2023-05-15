const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

function initialize(passport){ //, getUserByEmail, getUserById) {
  
  const authenticateUser = async (email, password, done) => {
    try{
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'There is no user with such email or the password is not correct' })
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
          return done(null, false, { message: 'There is no user with such email or the password is not correct' })
      }
    } catch (err) {
        return done(err)
      }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
}

module.exports = initialize;