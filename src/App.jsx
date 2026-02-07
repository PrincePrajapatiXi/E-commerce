import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import RefundPolicy from './pages/RefundPolicy';
import PlaceholderPage from './pages/PlaceholderPage';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PromoBanner from './components/PromoBanner';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <ScrollToTop />
              <PromoBanner />
              <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
                    <Route path="/returns" element={<ReturnPolicy />} />
                    <Route path="/refund" element={<RefundPolicy />} />
                  </Routes>
                </main>
                <Footer />
                <BackToTop />
                <FloatingWhatsApp />
              </div>
              <Toast />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

