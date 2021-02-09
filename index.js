const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// initialize .env flie
require('dotenv').config();

// setup express to recognize incoming requests
app.use(express.urlencoded({extended: false}))

// setup cookirParser
app.use(cookieParser());

// setup templating engine ejs and views folder
app.set('view engine', 'ejs');
app.set('views', './views');

// setup passport for authentication
app.use(session({
  name: 'User-app',
  // TODO  change secret before deployemnt
  secret: 'mytopsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}))
// check url
app.use(function(req, res, next){
  console.log(req.url);
  next();
})

app.use(passport.initialize());
app.use(passport.session())

// setup static assets
app.use(express.static("assets"))

// connect to mongodb
const connectDB = require('./config/db');
connectDB();

// user router
app.use('/users', require('./routes/user'))

app.listen(PORT, function(err){
  if(err) console.log(err);
  console.log('Server runniing on at http://localhost:' + PORT)
})