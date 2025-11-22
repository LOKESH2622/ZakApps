let cartCount = 0;
let filteredProducts = [...products];
let activeFilters = {
    categories: [],
    types: [],
    flavours: []
};

document.addEventListener('DOMContentLoaded', () => {
    initCart();
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        renderBestSellers();
    } else if (path.includes('products.html')) {
        renderProductsPage();
    } else if (path.includes('product-detail.html')) {
        renderProductDetail();
    } else if (path.includes('order-placed.html')) {
        renderOrderPage();
    }
});

// Cart Management
function initCart() {
    const saved = sessionStorage.getItem('cartCount');
    if (saved) {
        cartCount = parseInt(saved);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = cartCount;
        sessionStorage.setItem('cartCount', cartCount);
    }
}

function addToCart() {
    cartCount++;
    updateCartDisplay();
    
    const btn = event.target;
    const original = btn.textContent;
    btn.textContent = 'Added to Cart!';
    btn.style.background = '#2d5f3f';
    btn.style.color = 'white';
    
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
}

// Navigation
function goToProduct(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// Generate star rating
function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half) stars += '⯨';
    for (let i = 0; i < empty; i++) stars += '☆';
    
    return stars;
}

// Render Best Sellers on Homepage
function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;
    
    // Get first 4 products for best sellers
    const bestSellers = products.slice(0, 4);
    
    grid.innerHTML = bestSellers.map(p => `
        <div class="bestseller-card" onclick="goToProduct(${p.id})">
            <div class="bestseller-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="bestseller-info">
                <h3>${p.name}</h3>
                <div class="bestseller-price">
                    $${p.price.toFixed(2)}
                    ${p.oldPrice ? `<span class="bestseller-price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="bestseller-rating">
                    <span class="bestseller-stars">${generateStars(p.rating)}</span>
                    <span class="bestseller-reviews">${p.reviews} Reviews</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Products Page
function renderProductsPage() {
    const grid = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCount');
    
    if (!grid) return;
    
    // Update count
    if (countEl) {
        countEl.textContent = filteredProducts.length;
    }
    
    // Render flavour filters dynamically
    const flavours = [...new Set(products.map(p => p.flavour))];
    const flavoursContainer = document.getElementById('flavoursFilters');
    if (flavoursContainer) {
        flavoursContainer.innerHTML = flavours.map(f => 
            `<label><input type="checkbox" value="${f}" class="flavour-filter"> ${f}</label>`
        ).join('');
    }
    
    // Render products
    grid.innerHTML = filteredProducts.map(p => `
        <div class="product-card" onclick="goToProduct(${p.id})">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
                ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-rating">
                    <span class="stars">${generateStars(p.rating)}</span>
                    <span style="color: #999; font-size: 13px;">${p.reviews} Reviews</span>
                </div>
                <div class="product-price">
                    $${p.price.toFixed(2)}
                    ${p.oldPrice ? `<span class="product-price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup filter toggle
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    
    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.onclick = () => {
            filterSidebar.classList.toggle('active');
        };
    }
    
    // Setup sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.onchange = () => {
            sortProducts(sortSelect.value);
            renderProductsPage();
        };
    }
    
    // Setup apply filters button
    const applyBtn = document.getElementById('applyFiltersBtn');
    if (applyBtn) {
        applyBtn.onclick = () => {
            collectFilters();
            applyFilters();
            renderProductsPage();
        };
    }
    
    // Setup view toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.onclick = () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
}

// Collect filters
function collectFilters() {
    activeFilters.categories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.value);
    activeFilters.types = Array.from(document.querySelectorAll('.type-filter:checked'))
        .map(cb => cb.value);
    activeFilters.flavours = Array.from(document.querySelectorAll('.flavour-filter:checked'))
        .map(cb => cb.value);
}

// Apply filters
function applyFilters() {
    filteredProducts = products.filter(p => {
        if (activeFilters.categories.length > 0 && 
            !activeFilters.categories.includes(p.category)) {
            return false;
        }
        
        if (activeFilters.types.length > 0 && 
            !activeFilters.types.includes(p.type)) {
            return false;
        }
        
        if (activeFilters.flavours.length > 0 && 
            !activeFilters.flavours.includes(p.flavour)) {
            return false;
        }
        
        return true;
    });
}

// Sort products
function sortProducts(type) {
    switch(type) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
}

// Product Detail Page
function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumbProduct');
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
    }
    
    // Render product detail
    const grid = document.getElementById('productDetailGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="detail-images">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="mainImage">
                </div>
                <div class="thumbnail-images">
                    <div class="thumbnail active" onclick="changeImage('${product.image}', this)">
                        <img src="${product.image}" alt="Thumb 1">
                    </div>
                    <div class="thumbnail" onclick="changeImage('${product.image}', this)">
                        <img src="${product.image}" alt="Thumb 2">
                    </div>
                    <div class="thumbnail" onclick="changeImage('${product.image}', this)">
                        <img src="${product.image}" alt="Thumb 3">
                    </div>
                </div>
            </div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <div class="detail-price">
                    $${product.price.toFixed(2)}
                    ${product.oldPrice ? `<span class="detail-price-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="detail-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span style="color: #666;">${product.reviews} Reviews</span>
                </div>
                <p class="detail-description">${product.description}</p>
                <div class="detail-actions">
                    <button class="btn-primary" onclick="addToCart()">ADD TO CART</button>
                    <button class="btn-secondary" onclick="buyNow()">Buy Now</button>
                </div>
                <button class="wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    WISHLIST
                </button>
                <div class="share-section">
                    <span>SHARE:</span>
                    <div class="social-icons">
                        <div class="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </div>
                        <div class="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </div>
                        <div class="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Setup tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.onclick = () => {
            const tab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tab).classList.add('active');
        };
    });
    
    // Update tab description
    const tabDesc = document.getElementById('tabDescription');
    if (tabDesc) {
        tabDesc.textContent = product.description;
    }
}

function changeImage(src, thumb) {
    const mainImg = document.getElementById('mainImage');
    if (mainImg) {
        mainImg.src = src;
    }
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function buyNow() {
    cartCount++;
    updateCartDisplay();
    window.location.href = 'order-placed.html';
}

// Order Page
function renderOrderPage() {
    const orderNum = document.getElementById('orderNumber');
    const orderDate = document.getElementById('orderDate');
    
    if (orderNum) {
        orderNum.textContent = '#ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    if (orderDate) {
        orderDate.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}