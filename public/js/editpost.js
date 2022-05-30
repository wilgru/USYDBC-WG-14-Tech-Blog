const form = document.getElementById('form-new-post');
const deleteButton = document.getElementById('delete-post');

const formHandler = async (event) => {
    event.preventDefault();

    let emptyField = false;

    // Collect values from the login form
    const title = document.querySelector('#title-input');
    const body = document.querySelector('#body-input');
    const titleVal = title.value.trim();
    const bodyVal = body.value.trim();

    if (!titleVal) {
        title.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (!bodyVal) {
        body.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (emptyField) return;

    const urlItems = window.location.href.split('/')
    const postId = urlItems[urlItems.length - 1]

    const postStatus = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: titleVal, body: bodyVal }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!postStatus.ok) {
        alert(postStatus.statusText);
        return;
    } 

    window.location = '/dashboard';
}

const deleteHandler = async (event) => {
    event.preventDefault();

    const urlItems = window.location.href.split('/')
    const postId = urlItems[urlItems.length - 1]

    const postStatus = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!postStatus.ok) {
        alert(postStatus.statusText);
        return;
    }

    window.location = '/dashboard';
}

form.addEventListener('submit', formHandler);
deleteButton.addEventListener('click', deleteHandler);