const form = document.getElementById('form-signup');

const formHandler = async (event) => {
    event.preventDefault();
    
    let emptyField = false;

    // Collect values from the login form
    const name = document.querySelector('#name-input');
    const email = document.querySelector('#email-input');
    const password = document.querySelector('#password-input');
    const confirmPassword = document.querySelector('#confirm-password-input');

    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmPasswordVal = confirmPassword.value.trim();

    if (!nameVal) {
        name.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (!emailVal) {
        email.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (!passwordVal) {
        password.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (!confirmPasswordVal) {
        confirmPassword.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (passwordVal != confirmPasswordVal) {
        // password.style.backgroundColor = "lightcoral";
        confirmPassword.style.backgroundColor = "lightcoral";
        emptyField = true
    } 

    if (emptyField) return;

    const loginStatus = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name: nameVal, email: emailVal, password: passwordVal }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (!loginStatus.ok) {
        let data = await loginStatus.json();
        alert(data.message);
        return;
    }

    window.location = '/dashboard';
}
form.addEventListener('submit', formHandler);