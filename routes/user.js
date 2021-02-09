const express = require('express');
const passport = require('passport');
const { userSignIn, userSignUp, createUser, createSession, userProfile } = require('../controllers/user');

const router = express.Router();

router.get('/login', userSignIn)

// User passport as middleware
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
 createSession)
 router.get('/profile', userProfile)
router.get('/register', userSignUp)
router.post('/register', createUser)

module.exports = router;