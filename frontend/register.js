document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // For MVP, just store one user in localStorage
        const user = { name, email, password, address, phone };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful!');
        // Redirect to checkout if coming from there, else home
        const params = new URLSearchParams(window.location.search);
        if (params.get('redirect')) {
            window.location.href = params.get('redirect');
        } else {
            window.location.href = 'index.html';
        }
    });
}); 