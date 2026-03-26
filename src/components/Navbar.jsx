import React, { useState } from 'react'; // CLERK AUTH
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { UserButton } from '@clerk/clerk-react'; // CLERK AUTH

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { getCartCount } = useCart();
    const { isDark, toggleTheme } = useTheme();
    const { user } = useAuth(); // CLERK AUTH — user from Clerk via AuthContext wrapper
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/', { state: { searchQuery: searchQuery.trim() } });
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-glass shadow-md dark:shadow-gray-900/50 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="transform hover:scale-105 transition-transform duration-300">
                            <img src="/images/Catchy new logo-1.png" alt="Logo" className="h-16 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Home</Link>
                        <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Products</Link>
                        <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">About</Link>
                        <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Contact</Link>
                        
                            {!user && (
    <Link to="/sign-in" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Account</Link>
)}
                        
                    </nav>

                    {/* Search, Theme Toggle, and Cart */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 hover:shadow-md transition-shadow">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                                className="bg-transparent border-none focus:outline-none text-sm w-32 lg:w-48 dark:text-gray-200 dark:placeholder-gray-400"
                            />
                            <button
                                onClick={handleSearch}
                                className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-primary transform hover:scale-110 transition-all duration-200">
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow shadow-glow">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* CLERK AUTH — UserButton replaces manual avatar */}
                        {user && (
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: 'w-9 h-9 border-2 border-primary shadow-sm hover:shadow-md transition-shadow'
                                    }
                                }}
                            />
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 dark:text-gray-200 hover:text-primary focus:outline-none transform hover:scale-110 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-glass border-t border-gray-200 dark:border-gray-700 shadow-lg animate-slideDown absolute top-16 left-0 right-0 h-screen z-50 overflow-y-auto pb-20">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {/* Mobile Search */}
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 mb-3 mx-2">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                    className="bg-transparent border-none focus:outline-none text-sm w-full dark:text-gray-200 dark:placeholder-gray-400"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                                >
                                    <Search size={18} />
                                </button>
                            </div>

                            <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/products" className="block text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Products</Link>
                            <Link to="/about" className="block text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <Link to="/contact" className="block text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            
                            {/* CLERK AUTH — Show profile or sign-in link in mobile menu */}
                            {user ? (
                                <Link to="/account" className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 block" onClick={() => setIsMenuOpen(false)}>
                                    <div className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                                            {user.imageUrl ? (
                                                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm uppercase">
                                                    {user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U')}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName || 'User'}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate w-40">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-3 block text-center mt-2 text-primary hover:text-primary/80 font-medium">View Profile Dashboard</div>
                                </Link>
                            ) : (
                                <Link to="/sign-in" className="block text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Account</Link>
                            )}

                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px] w-full"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
