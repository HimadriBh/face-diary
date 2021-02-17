const Post = require("../models/post");
const User = require("../models/User");

const home = async (req, res) => {
  // show all the posts of logged in user
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })

      let users = await User.find({});

      res.render('home', {
        title: "Home",
        posts,
        all_users: users
     });
  } catch (error) {
    console.log('Error', error);
  }
}

module.exports = {
  home
}