const form = document.getElementById('form-login');
const alertBox = document.getElementById('alert-box');

// custom banner for temporary alerts
const mainAlert = (message) => {
    let alertBanner = document.createElement('div');
    alertBanner.classList = ['alert alert-danger col-4'];
    alertBanner.id = 'alert-banner';

    alertBanner.innerText = message;
    alertBox.append(alertBanner);

    alertBanner.style.opacity = 1;
  
    setTimeout(()=>{
        alertBanner.style.opacity = 0;
        alertBox.removeChild(alertBanner);
    }, 2000)
}

const formHandler = async (event) => {
    event.preventDefault();

    let emptyField = false;

    // Collect values from the login form
    const email = document.querySelector('#email-input');
    const password = document.querySelector('#password-input');
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    if (!emailVal) {
        email.style.borderColor = "lightcoral";
        mainAlert("Email cannot be empty");
        emptyField = true
    } 

    if (!passwordVal) {
        password.style.borderColor = "lightcoral";
        mainAlert("Password cannot be empty");
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
        mainAlert(data.message);
        return;
    }

    window.location = '/dashboard';
}

form.addEventListener('submit', formHandler);