var cartCount = 0;
var filteredProducts = [];
var filters = { categories: [], types: [], flavours: [] };

window.onload = function() {
    filteredProducts = products.slice();
    loadCart();
    init();
};

function init() {
    var path = location.pathname;
    if (path.indexOf('products') > -1) {
        showProducts();
    } else if (path.indexOf('product-detail') > -1) {
        showProductDetail();
    } else if (path.indexOf('order-placed') > -1) {
        showOrder();
    } else {
        showBestSellers();
    }
}

// Cart
function loadCart() {
    var saved = sessionStorage.getItem('cartCount');
    if (saved) cartCount = parseInt(saved);
    updateCart();
}

function updateCart() {
    var el = document.getElementById('cartCount');
    if (el) {
        el.textContent = cartCount;
        sessionStorage.setItem('cartCount', cartCount);
    }
}

function addToCart(btn) {
    cartCount++;
    updateCart();
    var text = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#2d5f3f';
    btn.style.color = '#fff';
    setTimeout(function() {
        btn.textContent = text;
        btn.style.background = '';
        btn.style.color = '';
    }, 1500);
}

function buyNow() {
    cartCount++;
    updateCart();
    location.href = 'order-placed.html';
}

function goToProduct(id) {
    location.href = 'product-detail.html?id=' + id;
}

// Stars
function getStars(rating) {
    var s = '';
    for (var i = 1; i <= 5; i++) {
        s += (i <= rating) ? '★' : '☆';
    }
    return s;
}

// Best Sellers
function showBestSellers() {
    var grid = document.getElementById('bestSellersGrid');
    if (!grid) return;
    
    var html = '';
    for (var i = 0; i < 4; i++) {
        var p = products[i];
        html += '<div class="bestseller-card" onclick="goToProduct(' + p.id + ')">';
        html += '<div class="bestseller-image"><img src="' + p.image + '" alt="' + p.name + '"></div>';
        html += '<div class="bestseller-info">';
        html += '<h3>' + p.name + '</h3>';
        html += '<div class="bestseller-price">$' + p.price.toFixed(2);
        if (p.oldPrice) html += '<span class="bestseller-price-old">$' + p.oldPrice.toFixed(2) + '</span>';
        html += '</div>';
        html += '<div class="bestseller-rating">';
        html += '<span class="bestseller-stars">' + getStars(p.rating) + '</span>';
        html += '<span class="bestseller-reviews">' + p.reviews + ' Reviews</span>';
        html += '</div></div></div>';
    }
    grid.innerHTML = html;
}

// Products Page
function showProducts() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    var countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = filteredProducts.length;
    
    // Flavour filters
    var flavourBox = document.getElementById('flavoursFilters');
    if (flavourBox) {
        var flavours = [];
        for (var i = 0; i < products.length; i++) {
            if (flavours.indexOf(products[i].flavour) === -1) {
                flavours.push(products[i].flavour);
            }
        }
        var fhtml = '';
        for (var j = 0; j < flavours.length; j++) {
            fhtml += '<label><input type="checkbox" value="' + flavours[j] + '" class="flavour-filter"> ' + flavours[j] + '</label>';
        }
        flavourBox.innerHTML = fhtml;
    }
    
    // Products
    var html = '';
    for (var k = 0; k < filteredProducts.length; k++) {
        var p = filteredProducts[k];
        html += '<div class="product-card" onclick="goToProduct(' + p.id + ')">';
        html += '<div class="product-image"><img src="' + p.image + '" alt="' + p.name + '">';
        if (p.badge) html += '<div class="product-badge">' + p.badge + '</div>';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<div class="product-name">' + p.name + '</div>';
        html += '<div class="product-rating"><span class="stars">' + getStars(p.rating) + '</span>';
        html += '<span class="reviews">' + p.reviews + ' Reviews</span></div>';
        html += '<div class="product-price">$' + p.price.toFixed(2);
        if (p.oldPrice) html += '<span class="product-price-old">$' + p.oldPrice.toFixed(2) + '</span>';
        html += '</div></div></div>';
    }
    grid.innerHTML = html;
    
    // Events
    var filterBtn = document.getElementById('filterToggleBtn');
    var sidebar = document.getElementById('filterSidebar');
    if (filterBtn && sidebar) {
        filterBtn.onclick = function() {
            sidebar.classList.toggle('active');
        };
    }
    
    var sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.onchange = function() {
            sortProducts(sortSelect.value);
            showProducts();
        };
    }
    
    var applyBtn = document.getElementById('applyFiltersBtn');
    if (applyBtn) {
        applyBtn.onclick = function() {
            applyFilters();
            showProducts();
        };
    }
}

function applyFilters() {
    var cats = document.querySelectorAll('.category-filter:checked');
    var types = document.querySelectorAll('.type-filter:checked');
    var flavs = document.querySelectorAll('.flavour-filter:checked');
    
    filters.categories = [];
    filters.types = [];
    filters.flavours = [];
    
    for (var i = 0; i < cats.length; i++) filters.categories.push(cats[i].value);
    for (var j = 0; j < types.length; j++) filters.types.push(types[j].value);
    for (var k = 0; k < flavs.length; k++) filters.flavours.push(flavs[k].value);
    
    filteredProducts = [];
    for (var m = 0; m < products.length; m++) {
        var p = products[m];
        var ok = true;
        
        if (filters.categories.length > 0 && filters.categories.indexOf(p.category) === -1) ok = false;
        if (filters.types.length > 0 && filters.types.indexOf(p.type) === -1) ok = false;
        if (filters.flavours.length > 0 && filters.flavours.indexOf(p.flavour) === -1) ok = false;
        
        if (ok) filteredProducts.push(p);
    }
}

function sortProducts(type) {
    if (type === 'price-low') {
        filteredProducts.sort(function(a, b) { return a.price - b.price; });
    } else if (type === 'price-high') {
        filteredProducts.sort(function(a, b) { return b.price - a.price; });
    } else if (type === 'rating') {
        filteredProducts.sort(function(a, b) { return b.rating - a.rating; });
    } else {
        filteredProducts.sort(function(a, b) { return a.name.localeCompare(b.name); });
    }
}

// Product Detail
function showProductDetail() {
    var params = new URLSearchParams(location.search);
    var id = parseInt(params.get('id'));
    var product = null;
    
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            product = products[i];
            break;
        }
    }
    
    if (!product) {
        location.href = 'products.html';
        return;
    }
    
    var breadcrumb = document.getElementById('breadcrumbProduct');
    if (breadcrumb) breadcrumb.textContent = product.name;
    
    var grid = document.getElementById('productDetailGrid');
    if (grid) {
        var html = '<div class="detail-images">';
        html += '<div class="main-image"><img src="' + product.image + '" alt="' + product.name + '"></div>';
        html += '</div>';
        html += '<div class="detail-info">';
        html += '<h1>' + product.name + '</h1>';
        html += '<div class="detail-price">$' + product.price.toFixed(2);
        if (product.oldPrice) html += '<span class="detail-price-old">$' + product.oldPrice.toFixed(2) + '</span>';
        html += '</div>';
        html += '<div class="detail-rating"><span class="stars">' + getStars(product.rating) + '</span>';
        html += '<span>' + product.reviews + ' Reviews</span></div>';
        html += '<p class="detail-description">' + product.description + '</p>';
        html += '<div class="detail-actions">';
        html += '<button class="btn-primary" onclick="addToCart(this)">ADD TO CART</button>';
        html += '<button class="btn-secondary" onclick="buyNow()">Buy Now</button>';
        html += '</div></div>';
        grid.innerHTML = html;
    }
    
    var tabDesc = document.getElementById('tabDescription');
    if (tabDesc) tabDesc.textContent = product.description;
    
    // Tabs
    var tabs = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].onclick = function() {
            var contents = document.querySelectorAll('.tab-content');
            for (var k = 0; k < tabs.length; k++) tabs[k].classList.remove('active');
            for (var m = 0; m < contents.length; m++) contents[m].classList.remove('active');
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        };
    }
}

// Order Page
function showOrder() {
    var orderNum = document.getElementById('orderNumber');
    var orderDate = document.getElementById('orderDate');
    
    if (orderNum) {
        orderNum.textContent = '#ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    if (orderDate) {
        var d = new Date();
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        orderDate.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }
}