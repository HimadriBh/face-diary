const User = require('../models/User')

const userSignIn = (req, res) => {
  res.render('login')
}
const userSignUp = (req, res) => {
  console.log(req.cookies)
  res.cookie('user_id', 67)
  res.render('register')
}

const createUser = (req, res) => {
  // first check if passwords are same
  if(req.body.password != req.body.confirm_password){
    res.redirect('back');
  }
  User.findOne({ email: req.body.email })
  .then((foundUser) => {
    if(!foundUser){
      User.create(req.body)
      .then(createdUser => {
        return res.redirect('/users/login');
      })
    }
  })
  .catch(err => {console.log('Error in signing up user', err); return})
}


module.exports = {
  userSignIn,
  userSignUp,
  createUser
}