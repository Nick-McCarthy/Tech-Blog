const newCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const blog_id = event.target.getAttribute('data-id');
    console.log('------------------------', blog_id)
    const description = document.querySelector('#newComment').value.trim();
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ blog_id: blog_id, description: description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/blogs/${blog_id}`);
      } else {
        alert('Fail');
      };
    } else {
      alert('Null Not Allowed');
    };
  };
};

document
  .querySelector('.newComment-form')
  .addEventListener('submit', newCommentHandler);
