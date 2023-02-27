const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newBlog-title').value.trim();
    const description = document.querySelector('#newBlog-contents').value.trim();

    if (title && description) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
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

document
    .querySelector('.newBlog-form')
    .addEventListener('submit', newBlogHandler);