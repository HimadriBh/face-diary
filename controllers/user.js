const User = require('../models/User')
const fs = require('fs');
const path = require('path');

const userSignIn = (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }else{
    res.render('login');
  }
}
const userSignUp = (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
  res.render('register')
}
const userProfile = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.render('profile', {
      title: 'User profile',
      profile_user: user
    })
  })
  .catch(err => {
    return res.redirect('back')
  })
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

const createSession = (req, res) => {
  req.flash('success', 'Logged in successfully');
  res.redirect('/')
}

const destroySession = (req, res) => {
  req.logout();
  req.flash('success', 'You are Logged out!');
  return res.redirect('/')
}

const update = async (req, res) => {
  if(req.user.id == req.params.id){
    try {
      let user = await User.findById(req.params.id)
      User.uploadedAvatar(req, res, function(err){
        if(err){ console.log("####Multer Error####", err) }

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){

          if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar))
          }
          // saving the path of the uploaded file into avatar field
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        req.flash('success', 'User updated successfully!');
        return res.redirect('back');

      })
    } catch (error) {
      return res.redirect('back')
    }
  } else {
    res.status(401).send('Unauthorized!');
  }
}

module.exports = {
  userSignIn,
  userSignUp,
  createUser,
  createSession,
  userProfile,
  destroySession,
  update
}