import React from 'react'; // CLERK AUTH
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { ReviewProvider } from './context/ReviewContext';
import { OrderProvider } from './context/OrderContext';
import { AddressProvider } from './context/AddressContext';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import PromoBanner from './components/PromoBanner';
import AnimatedRoutes from './components/AnimatedRoutes';
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
    <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <ReviewProvider>
            <OrderProvider>
            <AddressProvider>
            <Router>
              <GestureNavigationWrapper>
                <ScrollToTop />
                <PromoBanner />
                <OfflineIndicator />
                <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-16 md:pb-0">
                  <Navbar />
                  <main className="flex-grow">
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                  <BackToTop />

                  <BottomNav />
                  <PWAInstallPrompt />
                </div>
                <Toast />
              </GestureNavigationWrapper>
            </Router>
            </AddressProvider>
            </OrderProvider>
            </ReviewProvider>
          </WishlistProvider>
        </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
