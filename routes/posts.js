const express = require('express');
const router = express.Router();

const passport = require('../config/passport-local-strategy');
const { create } = require('../controllers/posts');

router.post('/create', passport.checkAuthentication, create);

module.exports = router;

