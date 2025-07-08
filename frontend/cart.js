document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="text-center text-gray-600 text-lg">Your cart is empty.</p>';
            checkoutBtn.disabled = true;
            return;
        }
        let html = '<table class="w-full text-left mb-6"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead><tbody>';
        let grandTotal = 0;
        cart.forEach((item, idx) => {
            const total = item.price * item.quantity;
            grandTotal += total;
            html += `<tr>
                <td>${item.name}</td>
                <td>${item.currency} ${item.price}</td>
                <td><input type="number" min="1" max="${item.stock}" value="${item.quantity}" data-idx="${idx}" class="qty-input w-16 border rounded px-2 py-1" /></td>
                <td>${item.currency} ${total}</td>
                <td><button class="remove-btn text-red-600" data-idx="${idx}">Remove</button></td>
            </tr>`;
        });
        html += `</tbody></table><div class="text-right font-bold text-xl">Grand Total: ${cart[0].currency} ${grandTotal}</div>`;
        cartItemsDiv.innerHTML = html;
        checkoutBtn.disabled = false;
    }

    // Handle quantity change
    cartItemsDiv.addEventListener('change', (e) => {
        if (e.target.classList.contains('qty-input')) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const idx = parseInt(e.target.dataset.idx, 10);
            let qty = parseInt(e.target.value, 10);
            if (isNaN(qty) || qty < 1) qty = 1;
            if (qty > cart[idx].stock) qty = cart[idx].stock;
            cart[idx].quantity = qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Handle remove
    cartItemsDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const idx = parseInt(e.target.dataset.idx, 10);
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Handle checkout
    checkoutBtn.addEventListener('click', () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = 'login.html?redirect=checkout.html';
        } else {
            window.location.href = 'checkout.html';
        }
    });

    renderCart();
}); 