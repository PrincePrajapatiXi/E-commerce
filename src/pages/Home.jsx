import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
    const [filter, setFilter] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || '';

    useEffect(() => {
        let result = products.filter(p => p.id !== 11); // Exclude Samsung (ID 11) from main listing

        // Apply search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (filter !== 'all') {
            result = result.filter(p => p.category === filter || (p.category && p.category.includes(filter)));
        }

        setFilteredProducts(result);
    }, [filter, searchQuery]);

    const featuredProducts = products.slice(0, 3); // Just taking first 3 as featured for demo
    const latestProducts = products.slice(6, 10); // Taking some others as latest

    return (
        <div className="space-y-8 sm:space-y-12 md:space-y-16 pb-8 sm:pb-12 md:pb-16">
            {/* Hero Section */}
            <div className="bg-gradient-hero py-10 md:py-16 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2 text-center md:text-left animate-fadeIn">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-primary">Premium Electronics</span><br />
                                For Every Lifestyle
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                                Discover cutting-edge technology that transforms your daily experience. From powerful laptops to sleek smartphones.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                                <a href="#featured" className="bg-gradient-primary hover:shadow-glow text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all shadow-lg transform hover:-translate-y-1 hover:scale-105 min-h-[44px] flex items-center justify-center">
                                    Shop Now &#x2192;
                                </a>
                                <a href="#special-offers" className="bg-white text-gray-800 border-2 border-gray-300 hover:border-primary hover:bg-gray-50 px-6 py-3 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all transform hover:-translate-y-1 min-h-[44px] flex items-center justify-center">
                                    View Deals
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative animate-float">
                            <img src="/images/Full Set up.png" alt="Premium Setup" loading="lazy" className="w-full h-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 relative inline-block w-full animate-fadeIn">
                    <span className="relative z-10 bg-white px-4">Featured Products</span>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent -z-0"></div>
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
                    {['all', 'laptop', 'monitor', 'accessory', 'mobile', 'gaming'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px] ${filter === cat
                                ? 'bg-gradient-primary text-white shadow-glow'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search Results Message */}
                {searchQuery && (
                    <div className="mb-6 text-center animate-fadeIn">
                        <p className="text-sm sm:text-base text-gray-600">
                            Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "<span className="font-semibold text-gray-900">{searchQuery}</span>"
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-2 text-xs sm:text-sm text-primary hover:underline min-h-[44px]"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Special Offers */}
            <div id="special-offers" className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex flex-col md:flex-row">

                            <div className="md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                                <span className="text-primary text-sm sm:text-sm font-bold tracking-wider uppercase mb-2 sm:mb-2">Limited Time Offer</span>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-4">Special Sunday Offers</h2>
                                <p className="text-sm sm:text-base md:text-base text-gray-600 mb-5 sm:mb-6 md:mb-8">
                                    Get exclusive deals on premium electronics. These offers refresh every Sunday, so don't miss out on your chance to save big!
                                </p>
                                <div className="flex items-end gap-3 sm:gap-4 md:gap-4 mb-5 sm:mb-6 md:mb-8">
                                    <span className="text-3xl sm:text-4xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">₹ 89,999</span>
                                    <span className="text-base sm:text-lg md:text-xl text-gray-400 line-through mb-1">₹ 1,29,999</span>
                                </div>
                                <Link to="/product/11" className="bg-gradient-dark hover:shadow-glow-lg text-white px-6 py-3 sm:px-8 sm:py-3 md:px-8 md:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all w-fit inline-block transform hover:-translate-y-1 hover:scale-105 min-h-[44px] flex items-center justify-center">
                                    Grab Deal Now
                                </Link>
                            </div>
                            <div className="md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 relative min-h-[250px] sm:min-h-[300px]">
                                <img
                                    src="/images/Samsung s25 ultra.png"
                                    alt="Special Offer"
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
