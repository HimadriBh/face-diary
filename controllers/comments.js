const Comment = require('../models/comments');
const Post = require('../models/post');

const create = (req, res) => {
  Post.findById(req.body.post)
    .then(post => {
      if(post){
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        })
        .then(comment => {
          post.comments.push(comment);
          post.save();
          res.redirect('/');
        })
      }
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  })
}
module.exports = {
  create
}