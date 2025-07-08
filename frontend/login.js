document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        // Admin login check
        if (email === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin_dashboard.html';
            return;
        }

        // Regular user login (existing logic)
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.email !== email || user.password !== password) {
            alert('Invalid email or password.');
            return;
        }
        alert('Login successful!');
        // Redirect to checkout if coming from there, else home
        const params = new URLSearchParams(window.location.search);
        if (params.get('redirect')) {
            window.location.href = params.get('redirect');
        } else {
            window.location.href = 'index.html';
        }
    });
}); 