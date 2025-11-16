// Page redirection
const redirectSignin = document.querySelectorAll('.redirect-signin');

redirectSignin.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'signin.html';
    });
});

const redirectBrowse = document.querySelectorAll('.redirect-browse');

redirectBrowse.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'browse-courses.html';
    });
});


