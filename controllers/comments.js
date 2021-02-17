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

const destroy = (req, res) => {

  Comment.findById(req.params.id)
  .then(comment => {
    if(comment.user == req.user.id){
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(postId, { $pull: req.params.id })
        .then(post => {
          res.redirect('back');
        })
    }
  })
  .catch(err => {
    return res.redirect('back');
  })
}
module.exports = {
  create,
  destroy
}