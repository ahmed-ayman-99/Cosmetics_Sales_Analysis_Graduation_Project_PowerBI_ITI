// Wishlist Page Logic

document.addEventListener('DOMContentLoaded', function() {
    renderWishlist();
});

function renderWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistGrid = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty-state');

    if (wishlist.length === 0) {
        wishlistGrid.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    } else {
        wishlistGrid.style.display = 'grid';
        emptyState.style.display = 'none';
    }

    wishlistGrid.innerHTML = '';
    wishlist.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'wishlist-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="wishlist-card-image">
            <div class="wishlist-card-title">${item.title}</div>
            <div class="wishlist-card-price">$${item.price.toFixed(2)}</div>
            <div class="wishlist-card-actions">
                <button class="add-to-cart-btn" data-idx="${idx}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                <button class="remove-wishlist-btn" data-idx="${idx}" title="Remove"><i class="fas fa-trash"></i></button>
            </div>
        `;
        wishlistGrid.appendChild(card);
    });

    // Bind events
    wishlistGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const idx = this.dataset.idx;
            addWishlistItemToCart(idx);
        });
    });
    wishlistGrid.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const idx = this.dataset.idx;
            removeWishlistItem(idx);
        });
    });
}

function addWishlistItemToCart(idx) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist[idx]) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = wishlist[idx];
    // Check if already in cart
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // Optionally show notification
    renderWishlist();
}

function removeWishlistItem(idx) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(idx, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
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