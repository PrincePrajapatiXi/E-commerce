import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';
import { products } from '../data/products';
import TrustBadges from '../components/TrustBadges';
import SEO from '../components/SEO';
import { TrendingUp, Zap, Award, Sparkles, ShoppingBag, Clock } from 'lucide-react';

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

    // Product sections data
    const bestSellers = products.filter(p => p.rating === 5 && p.id !== 11);
    const trendingNow = products.filter(p => p.category.includes('gaming') || p.category.includes('mobile'));
    const dealsOfTheDay = products.filter(p => p.oldPrice || p.price < 50000);
    const topRated = [...products].sort((a, b) => b.rating - a.rating).filter(p => p.id !== 11);
    const newArrivals = products.slice(-4).reverse();
    const laptops = products.filter(p => p.category.includes('laptop'));

    return (
        <div className="space-y-8 sm:space-y-12 md:space-y-16 pb-8 sm:pb-12 md:pb-16">
            <SEO
                title="Catchy Electronics - Premium Gadgets & Accessories"
                description="Discover premium electronics, laptops, mobiles, and gaming gear at Catchy. Shop now for exclusive deals and fast delivery."
            />
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
                                <a href="#featured" className="bg-gradient-primary hover:shadow-glow-lg text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all shadow-button transform hover:-translate-y-1 hover:scale-105 min-h-[44px] flex items-center justify-center gap-2 btn-ripple group">
                                    <span>Shop Now</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                                <a href="#special-offers" className="bg-white text-gray-800 border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all transform hover:-translate-y-1 shadow-button min-h-[44px] flex items-center justify-center btn-ripple">
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

            {/* Trust Badges */}
            <TrustBadges />

            {/* Featured Categories - 3 distinct cards as per spec */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 animate-fadeIn">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Card 1: Laptops */}
                    <div className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:-translate-y-2">
                        <img
                            src="/images/MacBook Air M4 1.png"
                            alt="Laptops"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">Laptops</h3>
                            <button onClick={() => setFilter('laptop')} className="text-sm font-medium hover:underline flex items-center">
                                Explore Collection <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Mobiles */}
                    <div className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:-translate-y-2">
                        <img
                            src="/images/Iphone 16 pro max.png"
                            alt="Mobiles"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">Mobiles</h3>
                            <button onClick={() => setFilter('mobile')} className="text-sm font-medium hover:underline flex items-center">
                                Shop Smartphones <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Gaming */}
                    <div className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:-translate-y-2">
                        <img
                            src="/images/Gaming controller.png"
                            alt="Gaming"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-2xl font-bold mb-2">Gaming</h3>
                            <button onClick={() => setFilter('gaming')} className="text-sm font-medium hover:underline flex items-center">
                                Level Up <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
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
                            className={`px-4 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 min-h-[44px] btn-ripple shadow-sm ${filter === cat
                                ? 'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/50'
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
                                <Link to="/product/11" className="bg-gradient-dark hover:shadow-glow-lg text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-xl text-sm sm:text-base font-bold transition-all w-fit inline-flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:scale-105 min-h-[44px] shadow-button-hover btn-ripple group">
                                    <span>Grab Deal Now</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-7xl mx-auto"></div>

            {/* Best Sellers Section */}
            <ProductSection
                title="🏆 Best Sellers"
                products={bestSellers}
                viewAllLink="/products"
                icon="🏆"
                gradient="from-yellow-500 to-orange-500"
            />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-7xl mx-auto"></div>

            {/* Trending Now Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-10 sm:py-12">
                <ProductSection
                    title="🔥 Trending Now"
                    products={trendingNow}
                    viewAllLink="/products"
                    icon="🔥"
                    gradient="from-blue-600 to-purple-600"
                />
            </div>

            {/* Deals of the Day Section */}
            <ProductSection
                title="⚡ Deals of the Day"
                products={dealsOfTheDay}
                viewAllLink="/products"
                icon="⚡"
                gradient="from-green-500 to-teal-500"
            />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-7xl mx-auto"></div>

            {/* Top Rated Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-10 sm:py-12">
                <ProductSection
                    title="⭐ Top Rated Products"
                    products={topRated}
                    viewAllLink="/products"
                    icon="⭐"
                    gradient="from-purple-600 to-pink-600"
                />
            </div>

            {/* New Arrivals Section */}
            <ProductSection
                title="✨ New Arrivals"
                products={newArrivals}
                viewAllLink="/products"
                icon="✨"
                gradient="from-indigo-500 to-cyan-500"
            />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-7xl mx-auto"></div>

            {/* Shop by Category - Laptops */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 py-10 sm:py-12">
                <ProductSection
                    title="💻 Laptops & Computers"
                    products={laptops}
                    viewAllLink="/products"
                    icon="💻"
                    gradient="from-slate-600 to-gray-600"
                />
            </div>
        </div>
    );
};

export default Home;
