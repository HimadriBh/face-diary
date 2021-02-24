const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'user-app'
}

passport.use(new JWTStrategy(options, function(jwtPayload, done){
  User.findById(jwtPayload._id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    console.log('Error in finding user from jwt');
    return done(null, false);
  })
}));

module.exports = passport;
