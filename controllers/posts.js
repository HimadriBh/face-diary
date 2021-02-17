const Post = require('../models/post');
const Comment = require('../models/comments');

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

const destroy = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    // .id means converting the object id into string format
    if(post.user == req.user.id){
      post.remove();
      Comment.deleteMany({ post: req.params.id })
        .then(() => {
          return res.redirect('back');
        })
    }
  })
  .catch(err => {
    return res.redirect('back')
  })
}

module.exports = {
  create,
  destroy
}