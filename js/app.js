/**
 * FoodApp — Client-Side JavaScript
 * Cart management, session authentication, animations, toast notifications
 */

// Initialize theme early to avoid flashes
if (localStorage.getItem('foodapp_theme') === 'light') {
    document.documentElement.classList.add('light-theme');
}

/* ═══════════════════════════════════════════════════════════════════════════
   SESSION MANAGEMENT
   ═══════════════════════════════════════════════════════════════════════════ */
function checkSession() {
    const user = localStorage.getItem('foodapp_active_user');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('foodapp_active_user');
    window.location.href = '../index.html';
}

/* ═══════════════════════════════════════════════════════════════════════════
   CART MANAGEMENT (localStorage-based)
   ═══════════════════════════════════════════════════════════════════════════ */
const Cart = {
    STORAGE_KEY: 'foodapp_cart',

    /** Returns cart object from localStorage */
    getCart() {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : { items: [], restaurantId: null, restaurantName: '' };
    },

    /** Saves cart object to localStorage */
    saveCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateCartBadge();
    },

    /** Adds an item to the cart */
    addItem(item) {
        const cart = this.getCart();

        // Warn if mixing restaurants
        if (cart.restaurantId && cart.restaurantId !== item.restaurantId) {
            if (!confirm('⚠️ Your cart has items from another restaurant. Start a new cart?')) {
                return false;
            }
            cart.items = [];
            cart.restaurantId = null;
        }

        cart.restaurantId   = item.restaurantId;
        cart.restaurantName = item.restaurantName;

        const existing = cart.items.find(i => i.id === item.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.items.push({ ...item, qty: 1 });
        }

        this.saveCart(cart);
        return true;
    },

    /** Removes an item from the cart */
    removeItem(itemId) {
        const cart = this.getCart();
        cart.items = cart.items.filter(i => i.id !== itemId);
        if (cart.items.length === 0) {
            cart.restaurantId   = null;
            cart.restaurantName = '';
        }
        this.saveCart(cart);
    },

    /** Updates qty of an item (+1 / -1) */
    updateQty(itemId, delta) {
        const cart = this.getCart();
        const item = cart.items.find(i => i.id === itemId);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            cart.items = cart.items.filter(i => i.id !== itemId);
        }
        if (cart.items.length === 0) {
            cart.restaurantId   = null;
            cart.restaurantName = '';
        }
        this.saveCart(cart);
    },

    /** Clears the entire cart */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateCartBadge();
    },

    /** Returns total item count */
    totalCount() {
        const cart = this.getCart();
        return cart.items.reduce((sum, i) => sum + i.qty, 0);
    },

    /** Returns total price */
    totalPrice() {
        const cart = this.getCart();
        return cart.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    },

    /** Updates the cart badge in navbar */
    updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if (badge) {
            const count = this.totalCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline' : 'none';
        }
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
const Toast = {
    show(message, type = 'info', duration = 3000) {
        const icons = { success: '✅', error: '❌', info: '🍽️' };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   ADD TO CART HANDLER (Menu Page)
   ═══════════════════════════════════════════════════════════════════════════ */
function addToCart(btn, id, name, price, restaurantId, restaurantName) {
    const item = { id, name, price: parseFloat(price), restaurantId, restaurantName };
    const success = Cart.addItem(item);

    if (success) {
        // Visual feedback
        btn.classList.add('added');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Added';

        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = originalText;
        }, 1500);

        Toast.show(`${name} added to cart!`, 'success');
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   CART PAGE RENDERER
   ═══════════════════════════════════════════════════════════════════════════ */
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty');
    const checkoutSection = document.getElementById('checkout-section');
    const totalEl = document.getElementById('cart-total');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxEl = document.getElementById('cart-tax');

    if (!container) return;

    const cart = Cart.getCart();

    if (cart.items.length === 0) {
        if (emptyState)      emptyState.style.display = 'block';
        if (checkoutSection) checkoutSection.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    if (emptyState)      emptyState.style.display = 'none';
    if (checkoutSection) checkoutSection.style.display = 'block';

    const foodEmojis = ['🍕', '🍔', '🍜', '🍛', '🌮', '🥗', '🍱', '🍣', '🍲', '🌯'];

    container.innerHTML = cart.items.map((item, idx) => `
        <div class="cart-item" id="cart-item-${item.id}">
            <div class="cart-item-icon">${foodEmojis[item.id % foodEmojis.length]}</div>
            <div style="flex:1;">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                <span class="qty-num" id="qty-${item.id}">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
                <button class="qty-btn" onclick="removeFromCart(${item.id})" 
                        style="color: var(--accent-pink); border-color: rgba(255,71,87,0.3);" title="Remove">🗑️</button>
            </div>
            <div style="min-width:80px; text-align:right;">
                <strong style="color: var(--accent-orange);">₹${(item.price * item.qty).toFixed(2)}</strong>
            </div>
        </div>
    `).join('');

    const total = Cart.totalPrice();
    const delivery = total > 0 ? 40 : 0;
    const taxes    = parseFloat((total * 0.05).toFixed(2));
    const grandTotal = total + delivery + taxes;

    if (subtotalEl) subtotalEl.textContent = `₹${total.toFixed(2)}`;
    if (taxEl)      taxEl.textContent      = `₹${taxes.toFixed(2)}`;
    if (totalEl)    totalEl.textContent    = `₹${grandTotal.toFixed(2)}`;
}

function changeQty(itemId, delta) {
    Cart.updateQty(itemId, delta);
    renderCart();
}

function removeFromCart(itemId) {
    Cart.removeItem(itemId);
    Toast.show('Item removed from cart', 'info');
    renderCart();
}

function clearCart() {
    if (confirm('Clear your entire cart?')) {
        Cart.clear();
        renderCart();
        Toast.show('Cart cleared', 'info');
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH DEBOUNCE
   ═══════════════════════════════════════════════════════════════════════════ */
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach((card, idx) => {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(24px)';
        card.style.transition = `opacity 0.5s ease ${idx * 0.07}s, transform 0.5s ease ${idx * 0.07}s`;
        observer.observe(card);
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge
    Cart.updateCartBadge();

    // Render cart if on cart page
    if (document.getElementById('cart-items-container')) {
        renderCart();
    }

    // Scroll animations
    initScrollAnimations();

    // Inject Theme Toggle Button Dynamically
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const li = document.createElement('li');
        li.className = 'nav-item-theme';
        const isLight = document.documentElement.classList.contains('light-theme');
        li.innerHTML = `
            <button id="theme-toggle-btn" class="btn-theme-toggle" title="Toggle Theme" style="
                background: var(--glass);
                border: 1px solid var(--glass-border);
                color: var(--text-primary);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                cursor: pointer;
                transition: var(--transition);
                padding: 0;
                margin-left: 8px;
            ">
                ${isLight ? '🌙' : '☀️'}
            </button>
        `;
        navbarNav.appendChild(li);

        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const docRoot = document.documentElement;
                docRoot.classList.toggle('light-theme');
                const nowLight = docRoot.classList.contains('light-theme');
                localStorage.setItem('foodapp_theme', nowLight ? 'light' : 'dark');
                toggleBtn.innerHTML = nowLight ? '🌙' : '☀️';
                Toast.show(`Switched to ${nowLight ? 'Light' : 'Dark'} Mode`, 'info');
            });
        }
    }

    // Auto-hide alerts
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s ease';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });
});
