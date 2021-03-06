const form = document.getElementById('form-new-post');

const formHandler = async (event) => {
    event.preventDefault();

    let emptyField = false;

    // Collect values from the login form
    const title = document.getElementById('title-input');
    const body = document.getElementById('body-input');
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

    const postStatus = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title: titleVal, body: bodyVal }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!postStatus.ok) {
        alert(postStatus.statusText);
        return;
    }

    window.location = '/dashboard';
}

form.addEventListener('submit', formHandler);