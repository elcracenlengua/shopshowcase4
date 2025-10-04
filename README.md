# 🛍️ Premium Shopping Cart & Checkout System

A sophisticated e-commerce solution with a dynamic dark purple theme, glass-morphism effects, and advanced animations. Features a complete cart and checkout system with Telegram bot integration.

## ✨ Features

### 🎨 Design & UI
- **Dynamic Dark Purple Theme** - Modern, sophisticated color scheme
- **Glass-morphism Effects** - Translucent glass-like UI elements
- **Advanced Animations** - Smooth transitions and interactive effects
- **Particle Background** - Animated floating particles for visual appeal
- **Responsive Design** - Works perfectly on all devices
- **Typing Text Effects** - Dynamic text animations in headers

### 🛒 Cart Functionality
- **Add/Remove Items** - Seamless cart management
- **Quantity Controls** - Easy quantity adjustment
- **Persistent Storage** - Cart data saved locally
- **Real-time Updates** - Live cart total and item count
- **Cart Synchronization** - Sync with Telegram bot
- **Visual Feedback** - Animated notifications and cart icon effects

### 💳 Checkout System
- **Multi-step Form** - Organized checkout process
- **Form Validation** - Real-time input validation
- **Personal Information** - Name, email, phone collection
- **Shipping Address** - Complete address form
- **Payment Methods** - Credit card and PayPal options
- **Order Summary** - Detailed order breakdown
- **Secure Processing** - Simulated secure payment flow

### 🤖 Telegram Integration
- **Web App Support** - Native Telegram Web App experience
- **Cart Synchronization** - Sync cart data with bot
- **Order Notifications** - Automatic owner notifications
- **User Management** - Track user interactions
- **Command Support** - Bot commands for order history

### 📊 Data Management
- **JSON Storage** - Local data persistence
- **Order Tracking** - Complete order history
- **User Management** - Customer data organization
- **Cart Backup** - Export/import cart functionality
- **Real-time Updates** - Live data synchronization

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Telegram Bot Token
- Web server (for hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shopping-cart-system
   ```

2. **Install dependencies**
   ```bash
   pip install python-telegram-bot asyncio
   ```

3. **Configure the bot**
   - Edit `main.py` and replace `BOT_TOKEN` with your Telegram bot token
   - Update `OWNER_ID` with your Telegram user ID
   - Modify `WEB_APP_URL` to match your hosting URL

4. **Run the bot**
   ```bash
   python main.py
   ```

5. **Host the web files**
   - Upload all HTML, CSS, and JS files to your web server
   - Ensure the web app URL matches your bot configuration

## 📁 File Structure

```
shopping-cart-system/
├── index.html          # Main shop page
├── products.html       # Product listings
├── cart.html          # Shopping cart
├── checkout.html      # Checkout page
├── main.py            # Telegram bot backend
├── cart.js            # Cart management system
├── orders.json        # Order storage (auto-generated)
├── products.json      # Product data (auto-generated)
├── users.json         # User data (auto-generated)
├── carts.json         # Cart data (auto-generated)
└── README.md          # This file
```

## 🛠️ Customization

### Theme Colors
Edit CSS custom properties in the HTML files:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --background-dark: #1a1a2e;
    --text-light: #e6e6ff;
}
```

### Products
Products are automatically initialized in `main.py`. Modify the `initialize_sample_products()` method to add your own products.

### Animations
All animations use the Anime.js library. Customize animation parameters in the JavaScript sections of HTML files.

### Notifications
Notification styles can be customized in the `cart.js` file by modifying the `getNotificationColor()` and `getNotificationIcon()` methods.

## 🔧 Configuration

### Bot Settings
```python
# main.py
BOT_TOKEN = "your-bot-token-here"
WEB_APP_URL = "https://your-domain.com/"
OWNER_ID = 123456789  # Your Telegram user ID
```

### Email Notifications (Optional)
```python
EMAIL_ENABLED = True
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "your-email@gmail.com"
EMAIL_PASSWORD = "your-app-password"
```

## 📱 Usage

### For Users
1. Start the Telegram bot with `/start`
2. Click "Open Shop" to launch the web app
3. Browse products and add items to cart
4. Review cart and proceed to checkout
5. Fill in shipping and payment information
6. Complete the order

### For Admin
- Receive instant notifications for new orders
- View order details in Telegram
- Access complete order history
- Manage customer data

## 🎯 Advanced Features

### Cart Synchronization
The system automatically syncs cart data between the web app and Telegram bot, ensuring a seamless experience across platforms.

### Real-time Validation
Form inputs are validated in real-time with visual feedback, improving user experience and reducing errors.

### Animated Feedback
Every user action triggers smooth animations and notifications, providing clear feedback and enhancing engagement.

### Data Persistence
All cart and order data is automatically saved and can survive page refreshes and browser restarts.

### Security Considerations
- Input validation on both client and server side
- Secure data transmission
- Order data encryption
- User authentication integration ready

## 🔍 Troubleshooting

### Common Issues
1. **Bot not responding**: Check bot token and permissions
2. **Web app not loading**: Verify WEB_APP_URL configuration
3. **Cart not syncing**: Ensure localStorage is enabled
4. **Animations not working**: Check Anime.js library loading

### Debug Mode
Enable debug logging in `main.py`:
```python
logging.basicConfig(level=logging.DEBUG)
```

## 🚀 Deployment

### Production Checklist
- [ ] Update all configuration values
- [ ] Set up proper web hosting
- [ ] Configure SSL certificate
- [ ] Test all functionality
- [ ] Set up monitoring
- [ ] Configure backup systems

### Performance Optimization
- Minify CSS and JavaScript
- Optimize images
- Enable caching
- Use CDN for libraries
- Monitor loading times

## 📈 Future Enhancements

### Planned Features
- Product search and filtering
- User authentication system
- Payment gateway integration
- Inventory management
- Order tracking system
- Multi-language support
- Mobile app companion

### Contributing
Contributions are welcome! Please submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support and questions:
- Telegram: @your_support_username
- Email: support@your-domain.com
- Documentation: Check this README file

---

**Built with ❤️ using modern web technologies and Telegram Bot API**