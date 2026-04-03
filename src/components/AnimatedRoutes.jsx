import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Account from '../pages/Account';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ReturnPolicy from '../pages/ReturnPolicy';
import RefundPolicy from '../pages/RefundPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';
import OrderHistory from '../pages/OrderHistory';
import SignInPage from '../pages/SignInPage'; // CLERK AUTH
import SignUpPage from '../pages/SignUpPage'; // CLERK AUTH
import ProtectedRoute from './ProtectedRoute';
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
                <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                
                {/* CLERK AUTH */}
                <Route path="/sign-in/*" element={<PageTransition><SignInPage /></PageTransition>} />
                <Route path="/sign-up/*" element={<PageTransition><SignUpPage /></PageTransition>} />
                
                {/* Account / Protected Routes */}
                <Route path="/account" element={<ProtectedRoute><PageTransition><Account /></PageTransition></ProtectedRoute>} />
                <Route path="/account/profile" element={<ProtectedRoute><PageTransition><Account /></PageTransition></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Account /></PageTransition></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><PageTransition><OrderHistory /></PageTransition></ProtectedRoute>} />
                
                {/* Legal */}
                <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsAndConditions /></PageTransition>} />
                <Route path="/returns" element={<PageTransition><ReturnPolicy /></PageTransition>} />
                <Route path="/refund" element={<PageTransition><RefundPolicy /></PageTransition>} />
                
                {/* 404 */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
