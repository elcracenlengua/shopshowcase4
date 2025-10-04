/**
 * Cart Management System
 * Handles cart operations, data persistence, and Telegram Web App integration
 */

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.userId = null;
        this.init();
    }

    init() {
        // Initialize Telegram Web App
        if (window.Telegram && window.Telegram.WebApp) {
            this.telegram = window.Telegram.WebApp;
            this.userId = this.telegram.initDataUnsafe?.user?.id;
            this.telegram.expand();
            this.telegram.ready();
        }

        // Load cart from localStorage
        this.loadCart();
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for storage changes (for multi-tab synchronization)
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                this.cart = this.loadCart();
                this.updateCartDisplay();
            }
        });

        // Listen for visibility change to sync with Telegram
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.userId) {
                this.syncWithTelegram();
            }
        });
    }

    loadCart() {
        try {
            const cartData = localStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartDisplay();
            this.syncWithTelegram();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '',
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
        
        // Animate cart icon if it exists
        this.animateCartIcon();
    }

    removeItem(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            const removedItem = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            this.showNotification(`${removedItem.name} removed from cart!`, 'info');
        }
    }

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.showNotification('Cart cleared!', 'info');
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartDisplay() {
        // Update cart count in header
        const cartCountElements = document.querySelectorAll('.cart-count');
        const itemCount = this.getItemCount();
        
        cartCountElements.forEach(element => {
            if (itemCount > 0) {
                element.textContent = itemCount;
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        });

        // Update cart total if element exists
        const cartTotalElements = document.querySelectorAll('.cart-total');
        const total = this.getTotal();
        
        cartTotalElements.forEach(element => {
            element.textContent = `$${total.toFixed(2)}`;
        });
    }

    animateCartIcon() {
        const cartIcons = document.querySelectorAll('.cart-icon');
        
        cartIcons.forEach(icon => {
            if (window.anime) {
                anime({
                    targets: icon,
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    duration: 600,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 300px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #2ecc71, #27ae60)',
            error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            warning: 'linear-gradient(135deg, #f39c12, #e67e22)',
            info: 'linear-gradient(135deg, #667eea, #764ba2)'
        };
        return colors[type] || colors.info;
    }

    async syncWithTelegram() {
        if (!this.telegram || !this.userId) return;

        try {
            const cartData = {
                type: 'cart_update',
                user_id: this.userId,
                items: this.cart,
                total: this.getTotal(),
                item_count: this.getItemCount(),
                updated_at: new Date().toISOString()
            };

            // Send cart data to Telegram bot
            this.telegram.sendData(JSON.stringify(cartData));
        } catch (error) {
            console.error('Error syncing with Telegram:', error);
        }
    }

    exportCart() {
        return {
            items: this.cart,
            total: this.getTotal(),
            itemCount: this.getItemCount(),
            exportedAt: new Date().toISOString()
        };
    }

    importCart(cartData) {
        if (cartData && cartData.items && Array.isArray(cartData.items)) {
            this.cart = cartData.items;
            this.saveCart();
            this.showNotification('Cart imported successfully!', 'success');
            return true;
        } else {
            this.showNotification('Invalid cart data format!', 'error');
            return false;
        }
    }

    // Utility methods for formatting
    static formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
}

// Global cart manager instance
window.cartManager = new CartManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}