# Cosmetic Cursor - Premium Cosmetics E-commerce Website

A modern, responsive e-commerce website for premium cosmetics and beauty products, built with HTML5, CSS3, and JavaScript. Inspired by the Blusho theme with a sophisticated design and comprehensive functionality.

## 🎨 Design Features

- **Modern Color Palette**: Sophisticated color scheme using #FC9A8D, #B8CDD0, #DAA595, #FCE7E4, #FEE9E4, #F2F1EF, #506867
- **Typography**: Elegant font combination of Poppins and Playfair Display
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: CSS transitions and hover effects for enhanced user experience

## 🛍️ Category Structure

### Main Categories
1. **Makeup** (CategoryID: 1)
2. **Skincare** (CategoryID: 2)

### Subcategories

**Makeup:**
- Blush
- Makeup Remover
- Highlighter
- Foundation
- Powder
- Lip Gloss
- CC Cream
- Eye Shadow
- Concealer
- Eyeliner
- Lipstick
- Bronzer
- Contour
- Mascara
- BB Cream
- Lip Liner

**Skincare:**
- Face Mask
- Setting Spray
- Cleanser
- Primer
- Face Oil
- Serum
- Exfoliator
- Moisturizer

## 📱 Key Features

### Navigation & Layout
- **Sticky Header**: Fixed navigation with search, cart, and user account
- **Mega Menu**: Comprehensive dropdown navigation with category organization
- **Breadcrumb Navigation**: Clear page hierarchy and navigation
- **Responsive Sidebar**: Collapsible filters on mobile devices

### Product Management
- **Product Grid**: Responsive product display with hover effects
- **Advanced Filtering**: Filter by subcategory, brand, price range, and rating
- **Search Functionality**: Real-time search with AJAX
- **Product Details**: Comprehensive product pages with images, descriptions, and reviews
- **Wishlist System**: Add/remove products from wishlist
- **Shopping Cart**: Persistent cart with quantity management

### User Experience
- **Hero Slider**: Dynamic banner rotation with call-to-action buttons
- **Product Carousels**: Featured products and new arrivals
- **Category Cards**: Visual category navigation with descriptions
- **Quick View**: Modal product preview
- **Responsive Images**: Optimized image loading and display

### E-commerce Features
- **Price Display**: Original and sale prices with discount badges
- **Stock Status**: In-stock/out-of-stock indicators
- **Rating System**: Star ratings with review counts
- **Brand Filtering**: Filter products by brand categories
- **Sort Options**: Sort by price, popularity, and newest

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Poppins, Playfair Display)
- **Responsive**: Mobile-first approach with breakpoints
- **Performance**: Optimized images and lazy loading

## 📁 File Structure

```
cosmetic-cursor/
├── index.html              # Homepage
├── shop.html               # Product listing page
├── product-details.html    # Individual product page
├── about.html              # About us page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Main JavaScript functionality
│   │   ├── shop.js         # Shop page functionality
│   │   ├── product-details.js # Product details functionality
│   │   └── contact.js      # Contact page functionality
│   └── images/             # Product and banner images
├── info.json               # Project information
└── README.md               # Project documentation
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through the website to explore all features
4. **Test** responsive design by resizing your browser window

## 🎯 Key Pages

### Homepage (`index.html`)
- Hero slider with promotional banners
- Featured categories (Makeup & Skincare)
- Product carousels (New Arrivals, Best Sellers)
- Newsletter subscription
- Multi-column footer

### Shop Page (`shop.html`)
- Product grid with filtering options
- Sidebar with category, brand, price, and rating filters
- Search functionality
- Sort options
- Pagination

### Product Details (`product-details.html`)
- Product images with zoom functionality
- Detailed product information
- Add to cart and wishlist options
- Related products
- Customer reviews

### About Page (`about.html`)
- Company story and journey
- Mission and values
- Team member profiles
- Company statistics
- Brand philosophy

### Contact Page (`contact.html`)
- Contact information and methods
- Interactive contact form with validation
- FAQ section with accordion functionality
- Business hours and location
- Social media links

## 🎨 Color Scheme

- **Primary**: #FC9A8D (Coral Pink)
- **Secondary**: #B8CDD0 (Soft Blue-Gray)
- **Accent**: #DAA595 (Warm Beige)
- **Background**: #FCE7E4, #FEE9E4, #F2F1EF (Soft Creams)
- **Text**: #506867 (Dark Teal)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Products
1. Add product data to the `products` array in `assets/js/shop.js`
2. Include product images in `assets/images/`
3. Update category mapping if needed

### Modifying Categories
1. Update the `categoryMapping` object in `assets/js/shop.js`
2. Modify navigation menus in HTML files
3. Update sidebar filters in `shop.html`

### Styling Changes
1. Modify CSS variables in `assets/css/style.css`
2. Update color scheme and typography as needed
3. Adjust responsive breakpoints for different screen sizes

## 🌟 Features in Detail

### Advanced Filtering System
- **Subcategory Filtering**: Filter by specific product types within main categories
- **Multi-select Filters**: Select multiple brands, subcategories, and ratings
- **Price Range Slider**: Interactive price range selection
- **Real-time Updates**: Filters update product display instantly

### Shopping Cart System
- **Persistent Storage**: Cart data saved in localStorage
- **Quantity Management**: Increase/decrease product quantities
- **Remove Items**: Easy item removal from cart
- **Cart Summary**: Total price and item count display

### Wishlist Functionality
- **Add/Remove**: Toggle products in wishlist
- **Visual Feedback**: Heart icon changes when added
- **Persistent Storage**: Wishlist saved across sessions

### Search and Navigation
- **Live Search**: Real-time product search
- **Mega Menu**: Organized category navigation
- **Breadcrumbs**: Clear page navigation
- **Mobile Menu**: Collapsible mobile navigation

## 📈 Performance Optimizations

- **Lazy Loading**: Images load as needed
- **CSS Optimization**: Efficient selectors and minimal reflows
- **JavaScript Optimization**: Debounced search and efficient DOM manipulation
- **Responsive Images**: Appropriate image sizes for different screen sizes

## 🔒 Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📝 License

This project is created for educational and demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for the beauty and cosmetics industry** 

## 🔄 Changes from Original File

### 1. **After rendering product cards in shop.js**
```js
updateProductDisplay = function() {
  // ... existing code to render cards ...
  initWishlist(); // <-- Call this after cards are in the DOM
}
``` 