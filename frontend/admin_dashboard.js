document.addEventListener('DOMContentLoaded', () => {
    // Only allow access if isAdmin is set
    if (localStorage.getItem('isAdmin') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        window.location.href = 'login.html';
    });

    // Add Product
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const product = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            currency: document.getElementById('currency').value,
            stock: parseInt(document.getElementById('stock').value, 10),
            imageUrl: document.getElementById('imageUrl').value,
            category: document.getElementById('category').value.toLowerCase().trim(),
            subcategory: document.getElementById('subcategory').value.toLowerCase().trim(),
            description: document.getElementById('description').value
        };
        const res = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (res.ok) {
            alert('Product added!');
            addProductForm.reset();
            loadProducts();
        } else {
            const data = await res.json();
            alert('Error: ' + (data.message || 'Could not add product.'));
        }
    });

    // Load all products
    async function loadProducts() {
        const res = await fetch('http://localhost:3000/api/products/all');
        const data = await res.json();
        const tableDiv = document.getElementById('products-table');
        if (!data.products || data.products.length === 0) {
            tableDiv.innerHTML = '<p>No products found.</p>';
            return;
        }
        let html = '<table class="min-w-full text-sm"><thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Subcategory</th></tr></thead><tbody>';
        for (const p of data.products) {
            html += `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.price}</td><td>${p.stock}</td><td>${p.category}</td><td>${p.subcategory}</td></tr>`;
        }
        html += '</tbody></table>';
        tableDiv.innerHTML = html;
    }

    // Load all orders
    async function loadOrders() {
        const res = await fetch('http://localhost:3000/api/orders');
        const data = await res.json();
        const tableDiv = document.getElementById('orders-table');
        if (!data || data.length === 0) {
            tableDiv.innerHTML = '<p>No orders found.</p>';
            return;
        }
        let html = '<table class="min-w-full text-sm"><thead><tr><th>ID</th><th>User ID</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>';
        for (const o of data) {
            html += `<tr><td>${o.ID}</td><td>${o.USER_ID}</td><td>${o.ORDER_DATE}</td><td>${o.TOTAL_AMOUNT}</td><td>${o.STATUS}</td></tr>`;
        }
        html += '</tbody></table>';
        tableDiv.innerHTML = html;
    }

    loadProducts();
    loadOrders();
}); 