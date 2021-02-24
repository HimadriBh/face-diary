const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

passport.use(new googleStrategy({
  clientID: "1056429608155-cj9ide2jnkgqrfb307fh9kcf2457ttms.apps.googleusercontent.com",
  clientSecret: "tngWI3hG_fXVuOh19kKrYzLl",
  callbackURL: "http://localhost:3000/users/auth/google/callback"
},
  function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
      if(err) {
        console.log('err in google strategy-passport', err)
        return;
      }
      console.log(profile);

      if(user){
        return done(null, user);
      }else {
        User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        }, function(err, user){
          if(err) {
            console.log('err in creating user in google strategy-passport', err)
            return;
          }
          return done(null, user);
        })
      }
    })
  }
  ))

