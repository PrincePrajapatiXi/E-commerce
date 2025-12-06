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
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src="/images/Catchy new logo-1.png" alt="Logo" className="h-16 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Products</Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                        <Link to="/account" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Account</Link>
                    </nav>

                    {/* Search and Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1">
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
                                className="text-gray-500 hover:text-primary"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        <Link to="/cart" className="relative text-gray-700 hover:text-primary">
                            <ShoppingCart size={24} />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-primary focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/about" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link to="/contact" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link to="/account" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>Account</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
