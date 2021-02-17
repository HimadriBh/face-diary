const Post = require('../models/post');
const Comment = require('../models/comments');

const create = async (req, res) => {
  try {
      await Post.create({
      content: req.body.content,
      user: req.user._id
    })
    req.flash('success', 'Post created!');
    return res.redirect('back');

  } catch (error) {
    req.flash('error', err);
    return;
  }

}

const destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({ post: req.params.id });
        req.flash('success', 'Post deleted!');
        return res.redirect('back');
      }else{
        req.flash('error', 'You cannot delete the post!');
        return res.redirect('back')
      }
  } catch (error) {
    req.flash('error', err)
    return res.redirect('back')
  }
}

module.exports = {
  create,
  destroy
}