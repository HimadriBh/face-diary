const Post = require("../models/post");

const home = (req, res) => {
  // show all the posts of logged in user

  Post.find({})
    .populate('user')
    .exec()
    .then(posts => {
       res.render('home', { title: "Home", posts });
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  home
}