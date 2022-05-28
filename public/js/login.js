const form = document.getElementById('form-login');

const formHandler = async (event) => {
    event.preventDefault();
    console.log("JHHHJK")
    let emptyField = false;

    // Collect values from the login form
    const email = document.querySelector('#email-input');
    const password = document.querySelector('#password-input');
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    if (!emailVal) {
        email.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (!passwordVal) {
        password.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (emptyField) return;

    const loginStatus = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: emailVal, password: passwordVal }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!loginStatus.ok) {
        let data = await loginStatus.json();
        alert(data.message);
        return;
    } else {
        window.location = '/dashboard';
    }
}

form.addEventListener('submit', formHandler);