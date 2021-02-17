const Comment = require('../models/comments');
const Post = require('../models/post');

const create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if(post){
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });

      post.comments.push(comment);
      post.save();

      res.redirect('/');
    }
  } catch (error) {
    console.log(err);
    return;
  }
}

const destroy = async (req, res) => {
  try {
    let comment = Comment.findById(req.params.id);

    if(comment.user == req.user.id){
      let postId = comment.post;

      comment.remove();

      await Post.findByIdAndUpdate(postId, { $pull: req.params.id })

      res.redirect('back');
    } else {
      return res.redirect('back');
    }

  } catch (error) {
    console.log('Error', err);
    return;
  }
}
module.exports = {
  create,
  destroy
}