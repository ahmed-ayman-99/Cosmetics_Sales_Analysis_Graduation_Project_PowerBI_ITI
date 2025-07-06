// Product Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadProductData();
    initProductGallery();
    initProductTabs();
    initQuantitySelector();
    initProductOptions();
    initRelatedProducts();
    initReviews();
    initAddToCart();
    initWishlist();
});

// Load product data based on URL parameter
function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Find the product in the products array (you'll need to import this from shop.js or create a shared data file)
        const product = findProductById(productId);
        if (product) {
            updateProductDetails(product);
        } else {
            // Product not found, redirect to shop
            window.location.href = 'shop.html';
        }
    } else {
        // No product ID, redirect to shop
        window.location.href = 'shop.html';
    }
}

// Function to find product by ID (you'll need to import products data)
function findProductById(id) {
    // This should reference the same products array from shop.js
    // For now, we'll create a simple lookup
    const products = [
        // Copy the products array from shop.js here, or better yet, create a shared data file
        {
            id: 1,
            name: "Luminous Foundation",
            price: 45.00,
            image: "assets/images/product-1.jpg",
            category: "makeup",
            subcategory: "foundation",
            brand: "luxury",
            rating: 4.8,
            reviews: 124,
            description: "Long-lasting foundation with a natural finish",
            inStock: true,
            featured: "best"
        },
        // ... add all other products
    ];
    
    return products.find(product => product.id == id);
}

// Update the product details page with the selected product
function updateProductDetails(product) {
    // Update page title
    document.title = `${product.name} - Cosmetics Website`;
    
    // Update product title
    const titleElement = document.querySelector('.product-title');
    if (titleElement) {
        titleElement.textContent = product.name;
    }
    
    // Update product price
    const priceElement = document.querySelector('.current-price');
    if (priceElement) {
        priceElement.textContent = `$${product.price.toFixed(2)}`;
    }
    
    // Update product description
    const descElement = document.querySelector('.product-description p');
    if (descElement) {
        descElement.textContent = product.description;
    }
    
    // Update product image
    const imageElement = document.querySelector('.gallery-swiper img');
    if (imageElement) {
        imageElement.src = product.image;
        imageElement.alt = product.name;
    }
    
    // Update breadcrumb
    const breadcrumbElement = document.querySelector('.breadcrumb span:last-child');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = product.name;
    }
    
    // Update category in breadcrumb
    const categoryElement = document.querySelector('.breadcrumb a[href*="category"]');
    if (categoryElement) {
        categoryElement.href = `shop.html?category=${product.category}`;
        categoryElement.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    }
    
    // Update rating
    const ratingElement = document.querySelector('.rating-text');
    if (ratingElement) {
        ratingElement.textContent = `${product.rating} (${product.reviews} reviews)`;
    }
    
    // Update stars
    const starsContainer = document.querySelector('.product-rating .stars');
    if (starsContainer) {
        const fullStars = Math.floor(product.rating);
        const emptyStars = 5 - fullStars;
        starsContainer.innerHTML = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }
}

// Product Gallery functionality
function initProductGallery() {
    const gallerySwiper = new Swiper('.gallery-swiper', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: {
                el: '.gallery-thumbs',
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            }
        }
    });
}

// Product Tabs functionality
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Quantity Selector functionality
function initQuantitySelector() {
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            const maxValue = parseInt(qtyInput.max) || 10;
            if (currentValue < maxValue) {
                qtyInput.value = currentValue + 1;
            }
        });

        qtyInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            const min = parseInt(this.min) || 1;
            const max = parseInt(this.max) || 10;
            
            if (value < min) this.value = min;
            if (value > max) this.value = max;
        });
    }
}

// Product Options functionality
function initProductOptions() {
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.option-group');
            const buttons = optionGroup.querySelectorAll('.option-btn');
            
            // Remove active class from all buttons in the group
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update price if size changes
            updatePriceForSize(this.dataset.value);
        });
    });
}

function updatePriceForSize(size) {
    const priceMap = {
        '30ml': 45.00,
        '50ml': 65.00,
        '100ml': 120.00
    };
    
    const newPrice = priceMap[size];
    if (newPrice) {
        const currentPriceElement = document.querySelector('.current-price');
        if (currentPriceElement) {
            currentPriceElement.textContent = `$${newPrice.toFixed(2)}`;
        }
    }
}

// Add to Cart functionality
function initAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            
            // Simulate a small delay for better UX
            setTimeout(() => {
                const productInfo = getProductInfo();
                addProductToCart(productInfo);
                
                // Reset button state
                this.classList.remove('loading');
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 500);
        });
    }
}

function getProductInfo() {
    const productTitle = document.querySelector('.product-title').textContent;
    const currentPrice = parseFloat(document.querySelector('.current-price').textContent.replace('$', ''));
    const productImage = document.querySelector('.main-product-image').src;
    const quantity = parseInt(document.querySelector('.qty-input').value);
    
    // Get selected size
    const selectedSize = document.querySelector('.option-btn.active')?.dataset.value || '30ml';
    
    return {
        id: generateProductId(),
        title: productTitle,
        price: currentPrice,
        image: productImage,
        quantity: quantity,
        size: selectedSize
    };
}

function generateProductId() {
    return 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function addProductToCart(productInfo) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product with same ID and size already exists
    const existingItem = cart.find(item => 
        item.id === productInfo.id && item.size === productInfo.size
    );
    
    if (existingItem) {
        existingItem.quantity += productInfo.quantity;
    } else {
        cart.push(productInfo);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!', 'success');
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

// Wishlist functionality
function initWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const productInfo = getProductInfo();
            toggleWishlist(productInfo);
        });
    }
}

function toggleWishlist(productInfo) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const existingItem = wishlist.find(item => item.id === productInfo.id);
    
    if (existingItem) {
        wishlist = wishlist.filter(item => item.id !== productInfo.id);
        showNotification('Product removed from wishlist!', 'info');
    } else {
        wishlist.push(productInfo);
        showNotification('Product added to wishlist!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Related Products functionality
function initRelatedProducts() {
    const relatedProductsContainer = document.querySelector('.related-products .products-grid');
    
    if (relatedProductsContainer) {
        // Sample related products data
        const relatedProducts = [
            {
                id: 2,
                name: "Natural Lipstick",
                price: 28.00,
                rating: 4.9,
                image: "assets/images/product-2.jpg",
                badges: ["new"]
            },
            {
                id: 3,
                name: "Hydrating Serum",
                price: 65.00,
                rating: 4.7,
                image: "assets/images/product-3.jpg",
                badges: []
            },
            {
                id: 4,
                name: "Organic Shampoo",
                price: 32.00,
                originalPrice: 40.00,
                rating: 4.6,
                image: "assets/images/product-4.jpg",
                badges: ["sale"]
            }
        ];
        
        relatedProducts.forEach(product => {
            const productCard = createRelatedProductCard(product);
            relatedProductsContainer.appendChild(productCard);
        });
    }
}

function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const badges = product.badges.map(badge => 
        `<span class="badge badge-${badge}">${badge.charAt(0).toUpperCase() + badge.slice(1)}</span>`
    ).join('');

    const originalPrice = '';

    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${badges ? `<div class="product-badges">${badges}</div>` : ''}
            <div class="product-actions">
                <button class="action-btn wishlist-btn" aria-label="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn quick-view-btn" aria-label="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span>(${product.rating})</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary add-to-cart">Add to Cart</button>
        </div>
    `;

    // Add event listeners for related product cards
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productInfo = {
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        };
        addProductToCart(productInfo);
    });

    return card;
}

// Reviews functionality
function initReviews() {
    const loadMoreBtn = document.querySelector('.load-more-reviews');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreReviews();
        });
    }
}

function loadMoreReviews() {
    // Sample additional reviews
    const additionalReviews = [
        {
            author: "Maria L.",
            rating: 5,
            content: "Absolutely love this product! It's become a staple in my daily routine.",
            date: "3 days ago"
        },
        {
            author: "Jennifer K.",
            rating: 5,
            content: "The quality is outstanding and the results are visible within weeks.",
            date: "1 week ago"
        },
        {
            author: "Amanda R.",
            rating: 4,
            content: "Great product, though a bit pricey. Worth the investment for the results.",
            date: "2 weeks ago"
        }
    ];

    const reviewsList = document.querySelector('.reviews-list');
    
    additionalReviews.forEach(review => {
        const reviewItem = createReviewItem(review);
        reviewsList.appendChild(reviewItem);
    });

    // Hide load more button after loading all reviews
    const loadMoreBtn = document.querySelector('.load-more-reviews');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function createReviewItem(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    reviewItem.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <h4>${review.author}</h4>
                <div class="review-rating">
                    <span class="stars">${stars}</span>
                </div>
            </div>
            <span class="review-date">${review.date}</span>
        </div>
        <p class="review-content">"${review.content}"</p>
    `;
    
    return reviewItem;
}

// Image zoom functionality
function initImageZoom() {
    const productImages = document.querySelectorAll('.gallery-swiper img');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
    });
}

function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}">
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', closeImageModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeImageModal();
        }
    });

    function closeImageModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
}

// Social sharing functionality
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            const title = document.querySelector('.product-title').textContent;
            
            shareProduct(platform, url, title);
        });
    });
}

function shareProduct(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });

    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS for image modal
const imageModalStyle = document.createElement('style');
imageModalStyle.textContent = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }
    
    .image-modal .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .image-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .image-modal .modal-content img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    
    .image-modal .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
    
    .gallery-swiper img {
        cursor: zoom-in;
    }
`;
document.head.appendChild(imageModalStyle); 