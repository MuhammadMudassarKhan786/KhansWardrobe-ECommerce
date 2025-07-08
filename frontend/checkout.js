document.addEventListener('DOMContentLoaded', () => {
    const userInfoDiv = document.getElementById('user-info');
    const cartSummaryDiv = document.getElementById('cart-summary');
    const placeOrderBtn = document.getElementById('place-order-btn');

    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!user) {
        window.location.href = 'login.html?redirect=checkout.html';
        return;
    }
    if (cart.length === 0) {
        cartSummaryDiv.innerHTML = '<p class="text-center text-gray-600 text-lg">Your cart is empty.</p>';
        placeOrderBtn.disabled = true;
        return;
    }

    userInfoDiv.innerHTML = `
        <div class="bg-gray-100 p-4 rounded mb-4">
            <h3 class="font-bold text-lg mb-2">Personal Information</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        </div>
    `;

    let html = '<table class="w-full text-left mb-6"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead><tbody>';
    let grandTotal = 0;
    cart.forEach((item) => {
        const total = item.price * item.quantity;
        grandTotal += total;
        html += `<tr>
            <td>${item.name}</td>
            <td>${item.currency} ${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.currency} ${total}</td>
        </tr>`;
    });
    html += `</tbody></table><div class="text-right font-bold text-xl">Grand Total: ${cart[0].currency} ${grandTotal}</div>`;
    cartSummaryDiv.innerHTML = html;

    placeOrderBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        alert('Order placed successfully! Thank you for shopping with us.');
        window.location.href = 'index.html';
    });
}); 