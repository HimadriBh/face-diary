const express = require('express');
const { userSignIn, userSignUp } = require('../controllers/user');

const router = express.Router();

router.get('/login', userSignIn)
router.get('/register', userSignUp)

module.exports = router;