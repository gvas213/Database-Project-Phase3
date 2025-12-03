// Page redirection
const redirectSignin = document.querySelectorAll('.redirect-signin');

redirectSignin.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'signin.html';
    });
});

const redirectSignin = document.querySelectorAll('.redirect-browse');

redirectSignin.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'browse-courses.html';
    });
});

// signin.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const sidInput = document.getElementById('loginSID');
    const errorBox = document.getElementById('loginError');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.textContent = '';
  
      // Clear Bootstrap validation classes
      emailInput.classList.remove('is-invalid');
      sidInput.classList.remove('is-invalid');
  
      const email = emailInput.value;
      const sid = sidInput.value;
  
      // --- Basic client-side validation ---
      let hasError = false;
  
      if (!email) {
        emailInput.classList.add('is-invalid');
        hasError = true;
      }
  
      if (!sid || !/^\d+$/.test(sid)) {
        sidInput.classList.add('is-invalid');
        hasError = true;
      }
  
      if (hasError) {
        errorBox.textContent = 'Please fix the highlighted fields.';
        return;
      }
  
      // --- Send login request to backend ---
      try {
        const resp = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, sid }),
        });
  
        const payload = await resp.json().catch(() => ({}));
  
        if (!resp.ok) {
          errorBox.textContent = payload.error || 'Login failed. Please try again.';
          return;
        }
  
        // If successful, store student in localStorage for later use
        if (payload.student) {
          localStorage.setItem('student', JSON.stringify(payload.student));
        }
  
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } catch (err) {
        console.error('Login request failed:', err);
        errorBox.textContent = 'Network error. Please try again.';
      }
    });
  });
  
