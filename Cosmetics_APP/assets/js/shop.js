// Shop Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initShopFilters();
    initShopSorting();
    initShopPagination();
    initShopViewToggle();
    initProductGrid();
    loadProducts();
});

// Product data with new category structure
const products = [
    // Makeup Products
    {
        id: 1,
        name: "Divine Exfoliator",
        price: 80.21,
        image: "assets/images/product-2.jpg",
        category: "makeup",
        subcategory: "Face Mask",
        brand: "professional",
        rating: 3.3,
        reviews: 89,
        description: "Full coverage concealer for flawless skin",
        inStock: true,
        featured: "new"   
    },
    {
        id: 2,
        name: "Divine Lip Gloss",
        price: 55.14,
        image: "assets/images/product-1.jpg",
        category: "makeup",
        subcategory: "Lip Gloss",
        brand: "luxury",
        rating: 3.8,
        reviews: 124,
        description: "Long-lasting foundation with a natural finish",
        inStock: true,
        featured: "best"
    },
    {
        id: 3,
        name: "Super cleanser",
        price: 40.26,
        image: "assets/images/product-3.jpg",
        category: "makeup",
        subcategory: "Cleanser",
        brand: "luxury",
        rating: 1.5,
        reviews: 156,
        description: "Translucent setting powder for a matte finish",
        inStock: true,
        featured: "sale"
    },
    {
        id: 4,
        name: "Perfect Lip Liner",
        price: 71.83,
        image: "assets/images/product-4.jpg",
        category: "makeup",
        subcategory: "Lip Liner",
        brand: "organic",
        rating: 1.9,
        reviews: 67,
        description: "Natural blush for a healthy glow",
        inStock: true,
        featured: "best"
    },
    {
        id: 5,
        name: "Super Lip Gloss",
        price: 124.65,
        image: "assets/images/product-5.jpg",
        category: "makeup",
        subcategory: "Lip Gloss",
        brand: "luxury",
        rating: 3.2,
        reviews: 92,
        description: "Warm bronzer for sun-kissed skin",
        inStock: true,
        featured: "sale"
    },
    {
        id: 6,
        name: "Shimmer Highlighter",
        price: 63.09,
        image: "assets/images/product-6.jpg",
        category: "makeup",
        subcategory: "Setting Spray",
        brand: "professional",
        rating: 1.3,
        reviews: 203,
        description: "Intense highlighter for a radiant glow",
        inStock: true,
        featured: "best"
    },
    {
        id: 7,
        name: "Super Foundation",
        price: 25.46,
        image: "assets/images/product-7.jpg",
        category: "makeup",
        subcategory: "Foundation",
        brand: "luxury",
        rating: 2.8,
        reviews: 178,
        description: "18-shade palette with matte and shimmer finishes",
        inStock: true,
        featured: "new"
    },
    {
        id: 8,
        name: "Super Eye Shadow",
        price: 23.43,
        image: "assets/images/product-8.jpg",
        category: "makeup",
        subcategory: "eyeliner",
        brand: "professional",
        rating: 4.8,
        reviews: 145,
        description: "Waterproof liquid eyeliner for precise lines",
        inStock: true,
        featured: "sale"
    },
    {
        id: 9,
        name: "Volumizing Mascara",
        price: 28.00,
        image: "assets/images/product-9.jpg",
        category: "makeup",
        subcategory: "mascara",
        brand: "luxury",
        rating: 4.7,
        reviews: 234,
        description: "Lengthening and volumizing mascara",
        inStock: true,
        featured: "best"
    },
    {
        id: 10,
        name: "Matte Lipstick",
        price: 24.00,
        image: "assets/images/product-10.jpg",
        category: "makeup",
        subcategory: "lipstick",
        brand: "organic",
        rating: 4.5,
        reviews: 167,
        description: "Long-lasting matte lipstick in various shades",
        inStock: true,
        featured: "sale"
    },
    {
        id: 11,
        name: "Glossy Lip Gloss",
        price: 18.00,
        image: "assets/images/product-11.jpg",
        category: "makeup",
        subcategory: "lip-gloss",
        brand: "drugstore",
        rating: 4.3,
        reviews: 89,
        description: "Shiny lip gloss with moisturizing formula",
        inStock: true,
        featured: "new"
    },
    {
        id: 12,
        name: "Precision Lip Liner",
        price: 16.00,
        image: "assets/images/product-12.jpg",
        category: "makeup",
        subcategory: "lip-liner",
        brand: "professional",
        rating: 4.4,
        reviews: 76,
        description: "Long-lasting lip liner for defined lips",
        inStock: true,
        featured: "sale"
    },
    {
        id: 13,
        name: "BB Cream",
        price: 38.00,
        image: "assets/images/product-13.jpg",
        category: "makeup",
        subcategory: "bb-cream",
        brand: "organic",
        rating: 4.6,
        reviews: 134,
        description: "All-in-one BB cream with SPF protection",
        inStock: true,
        featured: "best"
    },
    {
        id: 14,
        name: "CC Cream",
        price: 42.00,
        image: "assets/images/product-14.jpg",
        category: "makeup",
        subcategory: "cc-cream",
        brand: "luxury",
        rating: 4.7,
        reviews: 98,
        description: "Color correcting cream for even skin tone",
        inStock: true,
        featured: "new"
    },
    {
        id: 15,
        name: "Contour Kit",
        price: 48.00,
        image: "assets/images/product-15.jpg",
        category: "makeup",
        subcategory: "contour",
        brand: "professional",
        rating: 4.8,
        reviews: 156,
        description: "Professional contour kit with multiple shades",
        inStock: true,
        featured: "best"
    },
    {
        id: 16,
        name: "Gentle Makeup Remover",
        price: 20.00,
        image: "assets/images/product-16.jpg",
        category: "makeup",
        subcategory: "makeup-remover",
        brand: "organic",
        rating: 4.5,
        reviews: 112,
        description: "Gentle makeup remover for sensitive skin",
        inStock: true,
        featured: "sale"
    },

    // Skincare Products
    {
        id: 17,
        name: "Hydrating Cleanser",
        price: 32.00,
        image: "assets/images/product-17.jpg",
        category: "skincare",
        subcategory: "cleanser",
        brand: "organic",
        rating: 4.7,
        reviews: 189,
        description: "Gentle cleanser that removes impurities without stripping",
        inStock: true,
        featured: "best"
    },
    {
        id: 18,
        name: "Nourishing Moisturizer",
        price: 45.00,
        image: "assets/images/product-18.jpg",
        category: "skincare",
        subcategory: "moisturizer",
        brand: "luxury",
        rating: 4.8,
        reviews: 267,
        description: "Rich moisturizer for dry and sensitive skin",
        inStock: true,
        featured: "best"
    },
    {
        id: 19,
        name: "Vitamin C Serum",
        price: 58.00,
        image: "assets/images/product-19.jpg",
        category: "skincare",
        subcategory: "serum",
        brand: "professional",
        rating: 4.9,
        reviews: 345,
        description: "Brightening serum with vitamin C and hyaluronic acid",
        inStock: true,
        featured: "new"
    },
    {
        id: 20,
        name: "Rose Face Oil",
        price: 65.00,
        image: "assets/images/product-20.jpg",
        category: "skincare",
        subcategory: "face-oil",
        brand: "luxury",
        rating: 4.6,
        reviews: 123,
        description: "Luxurious face oil with rose extract",
        inStock: true,
        featured: "sale"
    },
    {
        id: 21,
        name: "Gentle Exfoliator",
        price: 28.00,
        image: "assets/images/product-21.jpg",
        category: "skincare",
        subcategory: "exfoliator",
        brand: "organic",
        rating: 4.5,
        reviews: 156,
        description: "Gentle exfoliator with natural ingredients",
        inStock: true,
        featured: "sale"
    },
    {
        id: 22,
        name: "Hydrating Face Mask",
        price: 25.00,
        image: "assets/images/product-22.jpg",
        category: "skincare",
        subcategory: "face-mask",
        brand: "drugstore",
        rating: 4.4,
        reviews: 98,
        description: "Intensive hydrating face mask",
        inStock: true,
        featured: "new"
    },
    {
        id: 23,
        name: "Smoothing Primer",
        price: 35.00,
        image: "assets/images/product-23.jpg",
        category: "skincare",
        subcategory: "primer",
        brand: "professional",
        rating: 4.7,
        reviews: 178,
        description: "Smoothing primer for flawless makeup application",
        inStock: true,
        featured: "best"
    },
    {
        id: 24,
        name: "Setting Spray",
        price: 22.00,
        image: "assets/images/product-24.jpg",
        category: "skincare",
        subcategory: "setting-spray",
        brand: "drugstore",
        rating: 4.3,
        reviews: 134,
        description: "Long-lasting setting spray for makeup",
        inStock: true,
        featured: "sale"
    }
];

// Category mapping
const categoryMapping = {
    'makeup': {
        name: 'Makeup',
        subcategories: {
            'blush': 'Blush',
            'makeup-remover': 'Makeup Remover',
            'highlighter': 'Highlighter',
            'foundation': 'Foundation',
            'powder': 'Powder',
            'lip-gloss': 'Lip Gloss',
            'cc-cream': 'CC Cream',
            'eye-shadow': 'Eye Shadow',
            'concealer': 'Concealer',
            'eyeliner': 'Eyeliner',
            'lipstick': 'Lipstick',
            'bronzer': 'Bronzer',
            'contour': 'Contour',
            'mascara': 'Mascara',
            'bb-cream': 'BB Cream',
            'lip-liner': 'Lip Liner'
        }
    },
    'skincare': {
        name: 'Skincare',
        subcategories: {
            'face-mask': 'Face Mask',
            'setting-spray': 'Setting Spray',
            'cleanser': 'Cleanser',
            'primer': 'Primer',
            'face-oil': 'Face Oil',
            'serum': 'Serum',
            'exfoliator': 'Exfoliator',
            'moisturizer': 'Moisturizer'
        }
    }
};

let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 8;

// Filter functionality
function initShopFilters() {
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const brandFilters = document.querySelectorAll('input[name="brand"]');
    const ratingFilters = document.querySelectorAll('input[name="rating"]');
    const priceRange = document.getElementById('price-range');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Brand filters
    brandFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Rating filters
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Price range
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            maxPriceInput.value = this.value;
            applyFilters();
        });
    }

    // Price inputs
    if (minPriceInput) {
        minPriceInput.addEventListener('input', applyFilters);
    }

    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(input => input.value);
    
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
    
    const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;

    filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }

        // Rating filter
        if (selectedRating && product.rating < parseFloat(selectedRating)) {
            return false;
        }

        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }

        return true;
    });

    currentPage = 1;
    updateProductDisplay();
    updateProductCount();
}

// Sorting functionality
function initShopSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortProducts(sortBy);
            updateProductDisplay();
        });
    }
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured - keep original order
            break;
    }
}

// Pagination functionality
function initShopPagination() {
    const paginationContainer = document.querySelector('.pagination');
    
    if (paginationContainer) {
        paginationContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('pagination-btn')) {
                e.preventDefault();
                
                if (e.target.classList.contains('prev')) {
                    if (currentPage > 1) {
                        currentPage--;
                        updateProductDisplay();
                    }
                } else if (e.target.classList.contains('next')) {
                    const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
                    if (currentPage < maxPages) {
                        currentPage++;
                        updateProductDisplay();
                    }
                } else {
                    currentPage = parseInt(e.target.textContent);
                    updateProductDisplay();
                }
            }
        });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn';
            pageBtn.textContent = i;
            
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            
            paginationNumbers.appendChild(pageBtn);
        }
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// View toggle functionality
function initShopViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (this.classList.contains('grid-view')) {
                productsGrid.classList.remove('list-view');
            } else {
                productsGrid.classList.add('list-view');
            }
        });
    });
}

// Product grid functionality
function initProductGrid() {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        productsGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                addToCart(productId);
            }
        });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Product added to cart!', 'success');
    }
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

// Load and display products
function loadProducts() {
    updateProductDisplay();
    updateProductCount();
}

function updateProductDisplay() {
    const productsGrid = document.getElementById('products-grid');
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    if (productsGrid) {
        productsGrid.innerHTML = '';
        
        currentProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    updatePagination();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const badges = product.badges ? product.badges.map(badge => 
        `<span class="badge badge-${badge}">${badge.charAt(0).toUpperCase() + badge.slice(1)}</span>`
    ).join('') : '';

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
            <h3 class="product-title">
                <a href="product-details.html?id=${product.id}" class="product-link">${product.name}</a>
            </h3>
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

    // Add click event to the entire card for navigation
    card.addEventListener('click', function(e) {
        // Don't navigate if clicking on action buttons
        if (e.target.closest('.product-actions') || e.target.closest('.add-to-cart')) {
            return;
        }
        window.location.href = `product-details.html?id=${product.id}`;
    });

    return card;
}

function updateProductCount() {
    const productCount = document.getElementById('product-count');
    const totalProducts = document.getElementById('total-products');
    
    if (productCount) {
        productCount.textContent = Math.min(productsPerPage, filteredProducts.length);
    }
    
    if (totalProducts) {
        totalProducts.textContent = filteredProducts.length;
    }
}

// URL parameter handling
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Category filter
    const category = urlParams.get('category');
    if (category) {
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }
    
    // Search query
    const search = urlParams.get('search');
    if (search) {
        // Filter products by search term
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
        updateProductDisplay();
        updateProductCount();
    }
}

// Initialize URL parameters
document.addEventListener('DOMContentLoaded', function() {
    handleUrlParameters();
});

// Notification function (if not already defined in main.js)
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

// Filter functions
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedSubcategories = Array.from(document.querySelectorAll('input[name="subcategory"]:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const selectedRating = document.querySelector('input[name="rating"]:checked')?.value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        
        // Subcategory filter
        const matchesSubcategory = selectedSubcategories.length === 0 || 
                                  selectedSubcategories.includes(product.subcategory);
        
        // Brand filter
        const matchesBrand = selectedBrands.length === 0 || 
                            selectedBrands.includes(product.brand);
        
        // Rating filter
        const matchesRating = !selectedRating || product.rating >= parseFloat(selectedRating);
        
        // Price filter
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        
        return matchesSearch && matchesSubcategory && matchesBrand && matchesRating && matchesPrice;
    });

    updateProductDisplay();
    updateResultsCount();
}

// Update URL parameters for category filtering
function updateURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    const featured = urlParams.get('featured');

    if (category) {
        // Filter by main category
        filteredProducts = products.filter(product => product.category === category);
        updateProductDisplay();
        updateResultsCount();
    } else if (subcategory) {
        // Filter by subcategory
        filteredProducts = products.filter(product => product.subcategory === subcategory);
        updateProductDisplay();
        updateResultsCount();
    } else if (featured) {
        // Filter by featured status
        filteredProducts = products.filter(product => product.featured === featured);
        updateProductDisplay();
        updateResultsCount();
    }
} 