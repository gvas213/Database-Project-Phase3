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
