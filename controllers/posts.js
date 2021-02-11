const Post = require('../models/post');

const create = (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id
  })
    .then(post => {
      return res.redirect('back');
    })
    .catch(err=> {
      if(err){
        console.log('err in creating post')
        return;
      }
    })
}

module.exports = {
  create
}