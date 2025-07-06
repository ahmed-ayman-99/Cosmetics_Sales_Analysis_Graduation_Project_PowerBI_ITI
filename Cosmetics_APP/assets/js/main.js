// Main JavaScript for Cosmetics Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initSearch();
    initMobileMenu();
    initCart();
    initAnimations();
    initNewsletter();
    initCustomerReviewsCarousel();
    initHeroSlider();
});

// Header functionality
function initHeader() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Search functionality
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchForm = document.querySelector('.search-form');

    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.querySelector('.search-input').focus();
            document.body.style.overflow = 'hidden';
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.querySelector('.search-input').value.trim();
            if (query) {
                // Redirect to shop page with search query
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Cart functionality
function initCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');

    // Update cart count display
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = button.closest('.product-card, .product-info');
            const productId = productCard.dataset.productId || Math.random().toString(36).substr(2, 9);
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            
            // Get quantity if available
            const quantityInput = productCard.querySelector('.qty-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    image: productImage,
                    quantity: quantity
                });
            }

            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update display
            updateCartCount();
            
            // Show success message
            showNotification('Product added to cart!', 'success');
        });
    });

    // Initialize cart count
    updateCartCount();
}

// Wishlist functionality
function initWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = button.closest('.product-card, .product-info');
            const productId = productCard.dataset.productId || Math.random().toString(36).substr(2, 9);
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            // Check if product already in wishlist
            const existingItem = wishlist.find(item => item.id === productId);
            
            if (existingItem) {
                wishlist = wishlist.filter(item => item.id !== productId);
                button.classList.remove('active');
                showNotification('Product removed from wishlist!', 'info');
            } else {
                wishlist.push({
                    id: productId,
                    title: productTitle,
                    price: productPrice,
                    image: productImage
                });
                button.classList.add('active');
                showNotification('Product added to wishlist!', 'success');
            }

            // Save to localStorage
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
    });
}

// Quick view functionality
function initQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Create quick view modal
            showQuickViewModal({
                title: productTitle,
                price: productPrice,
                image: productImage
            });
        });
    });
}

// Quick view modal
function showQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="modal-info">
                        <h3>${product.title}</h3>
                        <div class="modal-price">${product.price}</div>
                        <div class="modal-actions">
                            <button class="btn btn-primary add-to-cart">Add to Cart</button>
                            <button class="btn btn-secondary wishlist-btn">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .category-card, .blog-card, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Newsletter functionality
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                // Here you would typically send the email to your backend
                showNotification('Thank you for subscribing!', 'success');
                form.reset();
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
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

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    // Auto remove after 5 seconds
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

// Make showNotification globally available
window.showNotification = showNotification;

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize additional components
document.addEventListener('DOMContentLoaded', function() {
    initWishlist();
    initQuickView();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .quick-view-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 20px;
    }
    
    .modal-image img {
        width: 100%;
        border-radius: 8px;
    }
    
    .modal-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Initialize Customer Reviews Carousel
function initCustomerReviewsCarousel() {
    const reviewsCarousel = new Swiper('.reviews-carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        on: {
            init: function() {
                // Add ARIA labels for accessibility
                const slides = this.slides;
                slides.forEach((slide, index) => {
                    slide.setAttribute('aria-label', `Customer review ${index + 1}`);
                });
            }
        }
    });
}

// Initialize Hero Slider
function initHeroSlider() {
    const heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            init: function() {
                // Add ARIA labels for accessibility
                const slides = this.slides;
                slides.forEach((slide, index) => {
                    slide.setAttribute('aria-label', `Hero slide ${index + 1}`);
                });
            }
        }
    });
} 