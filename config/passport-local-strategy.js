const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  function(req, email, password, done){
    // find a user
    User.findOne({email: email}, function(err, user){
      if(err){
        req.flash("error", err)
        return done(err);
      }
      if(!user || user.password != password){
        req.flash("error", "Invalid Credentials, try logging again!")
        return done(null, false);
      }
      return done(null, user);
    })
  }
));

// serialize the user to decide whihc key is to be kept in the cookies
passport.serializeUser(function(user, done){
  done(null, user.id);
})

// deserialize the user from the key in the cookie
// whenever user/client makes a request this middleware is called to
//  identify the user and show customized results
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      console.log('Error in finding the user --> Passport')
      return done(err);
    }
    return done(null, user);
  })
})

passport.checkAuthentication = function(req, res, next){
  // if user signed in pass on the request to the route action
  if(req.isAuthenticated()){
    return next();
  }
  // if user not signed in
  return res.redirect('/users/login')
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;