const Post = require('../models/post');
const Comment = require('../models/comments');

const create = async (req, res) => {
  try {
      await Post.create({
      content: req.body.content,
      user: req.user._id
    })

    return res.redirect('back');

  } catch (error) {
    console.log('err in creating post', error)
    return;
  }

}

const destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({ post: req.params.id })
        return res.redirect('back');
      }else{
        return res.redirect('back')
      }
  } catch (error) {
    return res.redirect('back')
  }
}

module.exports = {
  create,
  destroy
}