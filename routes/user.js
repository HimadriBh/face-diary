const express = require('express');
const passport = require('../config/passport-local-strategy');
const { userSignIn, userSignUp, createUser, createSession, userProfile, destroySession } = require('../controllers/user');

const router = express.Router();

router.get('/login', userSignIn)

// User passport as middleware
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
 createSession)
router.get('/profile', passport.checkAuthentication, userProfile)
router.get('/register', userSignUp)
router.post('/register', createUser)
router.get('/logout', destroySession)

module.exports = router;