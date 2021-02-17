const express = require('express');
const router = express.Router();

const passport = require('../config/passport-local-strategy');
const { create, destroy } = require('../controllers/comments');

router.post('/create', passport.checkAuthentication, create);
router.get('/destroy/:id', passport.checkAuthentication, destroy);

module.exports = router;

