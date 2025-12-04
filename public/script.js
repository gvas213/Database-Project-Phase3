// Page redirection from home to sign in and browse courses pages
const redirectSigninButtons = document.querySelectorAll('.redirect-signin');
redirectSigninButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'signin.html';
  });
});

const redirectBrowseButtons = document.querySelectorAll('.redirect-browse');
redirectBrowseButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'browse-courses.html';
  });
});

const redirectChangePWButtons = document.querySelectorAll('.redirect-changePW');
redirectChangePWButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'change_pw.html';
  });
});

// Sign-in logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorBox = document.getElementById('loginError');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (errorBox) {
      errorBox.textContent = '';
    }

    //remove bootstrap validation
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    //validation
    let hasError = false;

    if (!email) {
      emailInput.classList.add('is-invalid');
      hasError = true;
    }

    if (!password) {
      passwordInput.classList.add('is-invalid');
      hasError = true;
    }

    if (hasError) {
      if (errorBox) {
        errorBox.textContent = 'Please fix the highlighted fields.';
      }
      return;
    }

    // send login to backend
    try {
      const resp = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // backend will expect { email, password } to match your DB columns
        body: JSON.stringify({ email, password }),
      });

      const payload = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        if (errorBox) {
          errorBox.textContent = payload.error || 'Login failed. Please try again.';
        }
        return;
      }

      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error('Login request failed:', err);
      if (errorBox) {
        errorBox.textContent = 'Network error.';
      }
    }
  });
});

//update password logic
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const changePWForm = document.getElementById('changePWForm');
    const errorBox = document.getElementById('loginError');

if (changePWForm) {
    const sidInput = document.getElementById('changePWSID');
    const oldPWInput = document.getElementById('oldPW');
    const newPWInput = document.getElementById('newPW');

    changePWForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (errorBox) {
        errorBox.textContent = '';
        errorBox.classList.remove('text-success');
        errorBox.classList.add('text-danger');
      }

      // validation
      sidInput.classList.remove('is-invalid');
      oldPWInput.classList.remove('is-invalid');
      newPWInput.classList.remove('is-invalid');

      const sid = sidInput.value.trim();
      const oldPassword = oldPWInput.value;
      const newPassword = newPWInput.value;

      let hasError = false;

      if (!sid) {
        sidInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!oldPassword) {
        oldPWInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!newPassword) {
        newPWInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        if (errorBox) {
          errorBox.textContent = 'Please fill in all fields.';
        }
        return;
      }

      try {
        const resp = await fetch('/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sid, oldPassword, newPassword }),
        });

        const payload = await resp.json().catch(() => ({}));

        if (!resp.ok) {
          if (errorBox) {
            errorBox.textContent = payload.error || 'Password change failed.';
          }
          return;
        }

        //success
        if (errorBox) {
          errorBox.textContent = payload.message || 'Password updated successfully.';
          errorBox.classList.remove('text-danger');
          errorBox.classList.add('text-success');
        }

        changePWForm.reset();
      } catch (err) {
        console.error('Change password request failed:', err);
        if (errorBox) {
          errorBox.textContent = 'Network error.';
        }
      }
    });
  }
});
