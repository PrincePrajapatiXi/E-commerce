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
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-8 md:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Premium Electronics</span><br />
                                For Every Lifestyle
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                                Discover cutting-edge technology that transforms your daily experience. From powerful laptops to sleek smartphones.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start">
                                <a href="#featured" className="bg-primary hover:bg-red-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Shop Now &#x2192;
                                </a>
                                <a href="#special-offers" className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 px-6 py-2 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition">
                                    View Deals
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <img src="/images/Full Set up.png" alt="Premium Setup" loading="lazy" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <div id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 relative inline-block w-full">
                    <span className="relative z-10 bg-white px-4">Featured Products</span>
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12">
                    {['all', 'laptop', 'monitor', 'accessory', 'mobile', 'gaming'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 sm:px-4 sm:py-2 md:px-6 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${filter === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search Results Message */}
                {searchQuery && (
                    <div className="mb-6 text-center">
                        <p className="text-sm sm:text-base text-gray-600">
                            Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "<span className="font-semibold text-gray-900">{searchQuery}</span>"
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-2 text-xs sm:text-sm text-primary hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Special Offers */}
            <div id="special-offers" className="bg-gray-50 py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">

                            <div className="md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                                <span className="text-primary text-xs sm:text-sm font-bold tracking-wider uppercase mb-1 sm:mb-2">Limited Time Offer</span>
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Special Sunday Offers</h2>
                                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8">
                                    Get exclusive deals on premium electronics. These offers refresh every Sunday, so don't miss out on your chance to save big!
                                </p>
                                <div className="flex items-end gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">₹ 89,999</span>
                                    <span className="text-sm sm:text-base md:text-xl text-gray-400 line-through mb-1">₹ 1,29,999</span>
                                </div>
                                <Link to="/product/11" className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg text-sm sm:text-base font-semibold transition w-fit inline-block">
                                    Grab Deal Now
                                </Link>
                            </div>
                            <div className="md:w-1/2 bg-gray-100 relative min-h-[300px]">
                                <img
                                    src="/images/Samsung s25 ultra.png"
                                    alt="Special Offer"
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover object-center"
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
