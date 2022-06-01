const form = document.getElementById('form-signup');
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
    const name = document.querySelector('#name-input');
    const email = document.querySelector('#email-input');
    const password = document.querySelector('#password-input');
    const confirmPassword = document.querySelector('#confirm-password-input');

    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmPasswordVal = confirmPassword.value.trim();

    if (!nameVal) {
        name.style.borderColor = "lightcoral";
        mainAlert("name cannot be empty");
        emptyField = true;
    } 

    if (!emailVal) {
        email.style.borderColor = "lightcoral";
        mainAlert("email cannot be empty");
        emptyField = true;
    } 

    if (!passwordVal) {
        password.style.borderColor = "lightcoral";
        mainAlert("Password cannot be empty");
        emptyField = true;
    } 

    if (!confirmPasswordVal) {
        confirmPassword.style.borderColor = "lightcoral";
        mainAlert("Confirm password cannot be empty");
        emptyField = true;
    } 

    if (passwordVal != confirmPasswordVal) {
        password.style.borderColor = "lightcoral";
        confirmPassword.style.borderColor = "lightcoral";
        mainAlert("Passwords do not match");
        emptyField = true;
    } 

    if (emptyField) return;

    const loginStatus = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name: nameVal, email: emailVal, password: passwordVal }),
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