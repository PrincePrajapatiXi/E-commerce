import React from 'react'; // CLERK AUTH
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
import TermsAndConditions from './pages/TermsAndConditions';
import Checkout from './pages/Checkout';
import SignInPage from './pages/SignInPage'; // CLERK AUTH
import SignUpPage from './pages/SignUpPage'; // CLERK AUTH
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';

import PromoBanner from './components/PromoBanner';
// New Mobile Components
import BottomNav from './components/BottomNav';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import useGestureNavigation from './hooks/useGestureNavigation';

// Gesture navigation wrapper component
const GestureNavigationWrapper = ({ children }) => {
  useGestureNavigation({ enabled: true });
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <GestureNavigationWrapper>
                <ScrollToTop />
                <PromoBanner />
                <OfflineIndicator />
                <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-16 md:pb-0">
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
                      {/* CLERK AUTH — Sign in/up routes with wildcard for Clerk sub-paths */}
                      <Route path="/sign-in/*" element={<SignInPage />} />
                      <Route path="/sign-up/*" element={<SignUpPage />} />
                      {/* CLERK AUTH — Account/Dashboard routes */}
                      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                      <Route path="/account/profile" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsAndConditions />} />
                      <Route path="/returns" element={<ReturnPolicy />} />
                      <Route path="/refund" element={<RefundPolicy />} />
                    </Routes>
                  </main>
                  <Footer />
                  <BackToTop />

                  <BottomNav />
                  <PWAInstallPrompt />
                </div>
                <Toast />
              </GestureNavigationWrapper>
            </Router>
          </WishlistProvider>
        </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
