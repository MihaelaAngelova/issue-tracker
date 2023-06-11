const registerForm = document.getElementById('register-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password2');
const error = document.getElementById('error-message');


registerForm.addEventListener('submit', (event) => {
    if (!validateRegisterForm()) {
      event.preventDefault();
    }
});

function validateRegisterForm() {
    error.innerHTML = ""; //clear the error messages when the form is resubmitted after errors have been corrected
    var messages = [];

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value)){
        messages.push('Email is not valid');
    }

    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(password.value.length <= 8 && !passwordRegex.test(password.value)){
        messages.push('Password is not valid. The password must be at least 8 characters, ' +
                        'must contain at least one number, and both upper and lowercase letters');
    }

    if(passwordConfirmation.value != password.value){
        messages.push('Passwords do not match');
    }

    if(messages.length > 0){
        error.innerHTML = messages.join('; ');
        return false;
    }

    return true;

};
