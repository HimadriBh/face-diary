{
  let addComment = function(){
    console.log('inside add comment')
    const newCommentForm = $('.new-comment-form');
    // console.log(newCommentForm);
    newCommentForm.each(function() {
      $(this).submit(function(e){
        e.preventDefault();
        $.ajax({
          method: 'POST',
          url: '/comments/create',
          data: $(this).serialize(),
          success: function(data){
            console.log(data)
            let comment = newCommentDom(data.data.comment);
            let postID = data.data.comment.post;
            $(`#post-comments-${postID}`).prepend(comment);
            deleteComment($(' .delete-comment-button', comment));
          },
          error: function(err){
            console.log(err.responseText)
          }
        })
      })
      // $(this).reset();
      this.reset();

    });
  }

  let newCommentDom = function(comment){
    return (`<div class="post-comment-item">
                <small style="position: relative;left: 20rem;"><a class='delete-comment-button' href="/comments/destroy/${ comment.id }"><i class="fas fa-trash-alt"></i></a></small>
              <p>${comment.content }</p>
              <small>
                ${comment.user.name}
              </small>
            </div>`)
  }

    let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
        type: 'GET',
        url: $(deleteLink).prop('href'),
        success: function(data){
          $(`#comment-${data.data.comment_id}`).remove();
          console.log(data);
        },
        error: function(err){
          console.log(err.responseText)
        }
      })
    })
  }
  addComment();
}