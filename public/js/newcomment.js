const form = document.getElementById('form-new-comment');

const formHandler = async (event) => {
    event.preventDefault();

    // Collect values from the form
    const body = document.querySelector('#body-input');
    const bodyVal = body.value.trim();

    if (!bodyVal) {
        body.style.backgroundColor = "lightcoral";
        return;
    } 

    const urlItems = window.location.href.split('/')
    const postId = urlItems[urlItems.length - 1]

    const commentStatus = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ body: bodyVal }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!commentStatus.ok) {
        alert(commentStatus.statusText);
        return;
    } else {
        window.location = `/post/view/${postId}`;
    }
}

form.addEventListener('submit', formHandler);