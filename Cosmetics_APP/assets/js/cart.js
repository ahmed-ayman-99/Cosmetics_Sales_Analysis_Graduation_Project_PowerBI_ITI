// Cart Page Logic

document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    bindOrderSummary();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty-state');
    const orderSummary = document.getElementById('order-summary');

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        orderSummary.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    } else {
        cartItemsContainer.style.display = 'block';
        orderSummary.style.display = 'block';
        emptyState.style.display = 'none';
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-meta">${item.subcategory ? item.subcategory + ' • ' : ''}${item.category ? capitalize(item.category) : ''}</div>
                <div class="cart-item-price">
                    $${item.price.toFixed(2)}
                    ${item.originalPrice ? `<span class='cart-item-original-price'>$${item.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" data-idx="${idx}" data-action="decrease">-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" min="1" data-idx="${idx}">
                    <button class="qty-btn" data-idx="${idx}" data-action="increase">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-idx="${idx}" title="Remove"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Bind events
    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.dataset.idx;
            const action = this.dataset.action;
            updateCartQuantity(idx, action);
        });
    });
    cartItemsContainer.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            const idx = this.dataset.idx;
            updateCartQuantity(idx, null, parseInt(this.value));
        });
    });
    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.dataset.idx;
            removeCartItem(idx);
        });
    });

    updateOrderSummary();
}

function updateCartQuantity(idx, action, value) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[idx]) return;
    if (action === 'increase') {
        cart[idx].quantity += 1;
    } else if (action === 'decrease') {
        cart[idx].quantity = Math.max(1, cart[idx].quantity - 1);
    } else if (value) {
        cart[idx].quantity = Math.max(1, value);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeCartItem(idx) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    // For now, no discounts or shipping
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

function bindOrderSummary() {
    document.getElementById('apply-discount').addEventListener('click', function() {
        // Placeholder: implement discount logic
        alert('Discount code applied (demo only).');
    });
    document.getElementById('calc-shipping').addEventListener('click', function() {
        // Placeholder: implement shipping calculation
        alert('Shipping calculated (demo only).');
    });
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        alert('Proceeding to checkout (demo only).');
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
} 