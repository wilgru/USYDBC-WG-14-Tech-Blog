const form = document.querySelector('.form-login');

const loginFormHandler = async (event) => {
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
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!loginStatus.ok) {
        alert(loginStatus.statusText);
        return;
    }

    window.location = '/dashboard';
    // document.location.replace('/profile');
}
form.addEventListener('submit', loginFormHandler);