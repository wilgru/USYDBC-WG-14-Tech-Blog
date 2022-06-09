const form = document.getElementById('form-new-comment');
const deleteButton = document.getElementById('delete-comment');

const formHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const body = document.getElementById('body-input');
    const bodyVal = body.value.trim();

    if (!bodyVal) {
        body.style.backgroundColor = "lightcoral";
        return;
    } 

    const urlItems = window.location.href.split('/')
    const commentId = urlItems[urlItems.length - 1]

    const commentStatus = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ body: bodyVal }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!commentStatus.ok) {
        alert(commentStatus.statusText);
        return;
    } 
    
    let data = await commentStatus.json();
    window.location = `/post/view/${data.post}`;
}

const deleteHandler = async (event) => {
    event.preventDefault();

    const urlItems = window.location.href.split('/')
    const commentId = urlItems[urlItems.length - 1]

    const commentStatus = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

    if (!commentStatus.ok) {
        alert(commentStatus.statusText);
        return;
    } 

    let data = await commentStatus.json();
    window.location = `/post/view/${data.post}`;
}

form.addEventListener('submit', formHandler);
deleteButton.addEventListener('click', deleteHandler);