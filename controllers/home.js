const Post = require("../models/post");
const User = require("../models/User");

const home = (req, res) => {
  // show all the posts of logged in user

  Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .exec()
    .then(posts => {

       User.find({})
       .then(users => {
         res.render('home', { title: "Home", posts, all_users: users });
       })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  home
}