import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { getCartCount } = useCart();
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
        <div className="bg-white/80 backdrop-blur-glass shadow-md sticky top-0 z-50 transition-all-smooth">
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
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Products</Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Contact</Link>
                        <Link to="/account" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-all duration-200">Account</Link>
                    </nav>

                    {/* Search and Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 hover:shadow-md transition-shadow">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                                className="bg-transparent border-none focus:outline-none text-sm w-32 lg:w-48"
                            />
                            <button
                                onClick={handleSearch}
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        <Link to="/cart" className="relative text-gray-700 hover:text-primary transform hover:scale-110 transition-all duration-200">
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow shadow-glow">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-primary focus:outline-none transform hover:scale-110 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    <div className="md:hidden bg-white/95 backdrop-blur-glass border-t border-gray-200 shadow-lg animate-slideDown absolute top-16 left-0 right-0 h-screen z-50 overflow-y-auto pb-20">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {/* Mobile Search */}
                            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-3 mx-2">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                    className="bg-transparent border-none focus:outline-none text-sm w-full"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    <Search size={18} />
                                </button>
                            </div>

                            <Link to="/" className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/products" className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Products</Link>
                            <Link to="/about" className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <Link to="/contact" className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            <Link to="/account" className="block text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium transition-all min-h-[44px]" onClick={() => setIsMenuOpen(false)}>Account</Link>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
