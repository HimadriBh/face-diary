const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
// mongo store to store the session cookie in database
app.use(session({
  name: 'User-app',
  // TODO  change secret before deployemnt
  secret: 'mytopsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoRemove: 'disabled'
  },
    function(err){
      console.log(err || 'connect-mongodb setup ok')
    }
  )
}))
// check url
app.use(function(req, res, next){
  console.log(req.url);
  next();
})

app.use(passport.initialize());
app.use(passport.session())

// set authenticated user in locals with each request
app.use(passportLocal.setAuthenticatedUser);

// setup static assets
app.use(express.static("assets"))

// connect to mongodb
const connectDB = require('./config/db');
connectDB();

// user router
app.use('/users', require('./routes/user'))

app.use('/', require('./routes/home'))

app.listen(PORT, function(err){
  if(err) console.log(err);
  console.log('Server runniing on at http://localhost:' + PORT)
})