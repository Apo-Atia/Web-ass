// wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.register-form');
    const loginForm  = document.querySelector('.login-form');
  
    // helper: get users array
    function loadUsers() {
      return JSON.parse(localStorage.getItem('users') || '[]');
    }
    // helper: save users array
    function saveUsers(arr) {
      localStorage.setItem('users', JSON.stringify(arr));
    }
    // helper: show error
    function showError(form, msg) {
      form.querySelector('#error-msg').textContent = msg;
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name  = signupForm.querySelector('#reg-name').value.trim();
        const email = signupForm.querySelector('#reg-email').value.trim();
        const pass  = signupForm.querySelector('#reg-pass').value;
        const agree = signupForm.querySelector('#agree')?.checked;
        const isAdmin = signupForm.querySelector('#is-admin')?.checked;
  
        // basic validation
        if (!name || !email || !pass) {
          return showError(signupForm, 'All fields are required.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return showError(signupForm, 'Enter a valid email.');
        }
        if (pass.length < 6) {
          return showError(signupForm, 'Password must be ≥ 6 chars.');
        }
        if (!agree) {
          return showError(signupForm, 'You must accept terms.');
        }
  
        const users = loadUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
          return showError(signupForm, 'Email already registered.');
        }
  
        users.push({ name, email, password: pass, isAdmin: !!isAdmin });
        saveUsers(users);
  
        // redirect
        if (isAdmin) {
          window.location.href = '../Pages/indexAdmin.html';
        } else {
          window.location.href = '../index.html';
        }
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = loginForm.querySelector('#log-email').value.trim();
        const pass  = loginForm.querySelector('#log-pass').value;
        const isAdmin = loginForm.querySelector('#is-admin')?.checked;
  
        if (!email || !pass) {
          return showError(loginForm, 'All fields are required.');
        }
  
        const users = loadUsers();
        const user = users.find(u =>
          u.email.toLowerCase() === email.toLowerCase()
          && u.password === pass
        );
        if (!user) {
          return showError(loginForm, 'Wrong email or password.');
        }
        if (isAdmin && !user.isAdmin) {
          return showError(loginForm, 'Not an admin account.');
        }
  
        // redirect
        if (isAdmin) {
          window.location.href = '../Pages/indexAdmin.html';
        } else {
          window.location.href = '../index.html';
        }
      });
    }
  });
  