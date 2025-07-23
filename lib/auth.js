// Authentication packages
const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');

// User model
const User = require('../app/models/user');

// Bearer strategy: extracts token from headers and validates user
const strategy = new BearerStrategy(async (token, done) => {
  try {
    const user = await User.findOne({ token });
    return done(null, user || false, { scope: 'all' });
  } catch (err) {
    return done(err);
  }
});

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Register the strategy
passport.use(strategy);

// Export initialized passport middleware
module.exports = passport.initialize();
