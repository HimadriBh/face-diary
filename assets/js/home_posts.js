{
  // method to submit a form using AJAX
  let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function(data){
          let newPost = newPostDom(data.data.post)
          $('#post-list-container').prepend(newPost);
          deletePost($(' .delete-post-button', newPost));
        },
        error: function(err) {
          console.log(err.responseText)
        }
      });
      this.reset();
    })
  }
  // add post to the DOM
  let newPostDom = function (post) {
    return $(`<div class="post-item" id="post-${post._id}">
            <h3 class="post-content">
              ${post.content}
            <p style="position: relative;left: 20rem;"><a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a></p>
            </h3>
            <p class="post-date"><span>${post.user.name}</span>${post.createdAt} </p>
            <div class="post-options">
              <p><span><i class="fas fa-thumbs-up"></i></span>Like</p>
              <p><span><i class="fas fa-comment"></i></span>Comment</p>
              <p><span><i class="fas fa-share"></i></span>Share</p>
            </div>
            <div class="post-comments">
              <form class="new-comment-form" action="/comments/create" method="POST">
                <input type="text" name="content" id="" placeholder="Write a comment..." required >
                <input type="hidden" name="post" value="${post._id}">
              </form>
                <div class="post-comment-list">
                  <ul id="post-comments-${post._id}">

                  </ul>
                </div>
            </div>
          </div>`)
  }

  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
        type: 'GET',
        url: $(deleteLink).prop('href'),
        success: function(data){
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function(err){
          console.log(err.responseText)
        }
      })
    })
  }

  createPost();
}