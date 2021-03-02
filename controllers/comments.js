const Comment = require('../models/comments');
const Post = require('../models/post');
const queue = require('../config/kue');
// const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker')

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

      comment = await comment.populate('user', 'name email').execPopulate();
      // commentsMailer.newComment(comment);
      let job = queue.create('emails', comment).save(function(err){
          if (err){
              console.log('Error in sending to the queue', err);
              return;
          }
          console.log('job enqueued', job.id);

      })

      if(req.xhr){
        return res.status(200).json({
          data: {
            comment: comment
          },
          message: "Post created!"
        });
      }
      req.flash('success', 'Comment published!');

      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
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
      if(req.xhr){
        return res.status(200).json({
          data: {
            comment_id: req.params.id
          },
          message: "Comment deleted!"
        });
      }
      req.flash('success', 'Comment deleted!');
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