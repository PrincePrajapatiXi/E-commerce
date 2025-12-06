# Catchy Electronics E-commerce Website

A modern, responsive e-commerce platform built with React and Vite for selling premium electronics and tech accessories.

## 🚀 Features

- **Product Catalog**: Browse laptops, monitors, accessories, mobiles, and gaming products
- **Search Functionality**: Search products by name or description
- **Category Filtering**: Filter products by category (laptop, monitor, accessory, mobile, gaming)
- **Shopping Cart**: Add/remove items, adjust quantities, view total
- **Product Details**: Detailed product pages with images, descriptions, and specifications
- **Policy Pages**: Privacy Policy, Return Policy, and Refund Policy
- **Responsive Design**: Mobile-first design, optimized for all screen sizes
- **Modern UI**: Clean, professional design with smooth animations

## 📁 Project Structure

```
react-app/
├── public/
│   └── images/          # Product images and assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Account.jsx
│   │   └── Policy pages...
│   ├── context/        # React Context
│   │   └── CartContext.jsx
│   ├── data/           # Product data
│   │   └── products.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── package.json
└── tailwind.config.js
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Context API** - Global state management

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/PrincePrajapatiXi/E-commerce.git
cd E-commerce/E-commerce-main/react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🏃 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Breakdown

### Home Page
- Hero section with featured setup image
- Featured products showcase
- Category filters
- Special offers section
- Latest products

### Products Page
- Complete product catalog
- Category filtering
- Search integration
- Mobile-optimized grid (3 products per row on mobile)

### Product Details
- Product images
- Detailed descriptions
- Specifications
- Add to cart functionality
- Related products

### Shopping Cart
- View cart items
- Adjust quantities
- Remove items
- View total price
- Checkout option (Coming Soon)

### Account Page
- Login/Sign up forms
- Social login options (Coming Soon)
- Password reset (Coming Soon)

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:
- Responsive product grid (3 columns on mobile, 4 on desktop)
- Compact navigation
- Touch-friendly buttons
- Optimized images
- Mobile-first design approach

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Primary color: Red (#ef4444)
- Custom animations
- Responsive breakpoints

### Vite
Configuration in `vite.config.js`:
- React plugin enabled
- Fast refresh for development

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy to any static hosting service.

## 👨‍💻 Author

**Prince Prajapati**

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Product images from various sources
- Icons from Lucide React
- UI inspiration from modern e-commerce platforms