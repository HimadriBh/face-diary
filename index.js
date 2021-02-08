const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// setup cookirParser
app.use(cookieParser());

// setup templating engine ejs and views folder
app.set('view engine', 'ejs');
app.set('views', './views');

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