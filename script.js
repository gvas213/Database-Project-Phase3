// Page redirection
const redirectSignin = document.querySelectorAll('.redirect-signin');

redirectSignin.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'signin.html';
    });
});


