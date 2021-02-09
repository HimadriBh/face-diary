const express = require('express');
const { userSignIn, userSignUp, createUser } = require('../controllers/user');

const router = express.Router();

router.get('/login', userSignIn)
router.get('/register', userSignUp)
router.post('/register', createUser)

module.exports = router;