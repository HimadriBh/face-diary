const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

const index = async (req, res) => {
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    });

  return res.json({
    message: "List of posts",
    posts: posts
  })
}
const destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        res.status(200).json({
          message: "Post and associated comments deleted successfully!"
        })
        // req.flash('success', 'Post deleted!');
      }else{
        return res.status(401).json({
          message: "You cannot delete this post! "
        })
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = {
  index,
  destroy
}