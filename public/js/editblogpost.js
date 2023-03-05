const editBlogHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#editBlog-title').value.trim();
    const description = document.querySelector('#editBlog-description').value.trim();

    if (title && description) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description: description }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Fail');
      };
    } else {
      alert('Null Not Allowed');
    };
  };
};

const deleteBlogHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Fail');
    };
  };
};

document
  .querySelector('.editBlog-form')
  .addEventListener('submit', editBlogHandler);

document
  .querySelector('.deleteBlog-btn')
  .addEventListener('click', deleteBlogHandler);
