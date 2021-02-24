const express = require('express');
const passport = require('../config/passport-local-strategy');
const { userSignIn, userSignUp, createUser, createSession, userProfile, destroySession, update } = require('../controllers/user');

const router = express.Router();

router.get('/login', userSignIn)

// User passport as middleware
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login' }),
 createSession)
router.get('/profile/:id', passport.checkAuthentication, userProfile)
router.post('/profile/:id', passport.checkAuthentication, update)
router.get('/register', userSignUp)
router.post('/register', createUser)
router.get('/logout', destroySession)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), createSession )

module.exports = router;