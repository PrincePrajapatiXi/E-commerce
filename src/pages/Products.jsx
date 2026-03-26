import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import FilterDrawer from '../components/FilterDrawer';
import { products } from '../data/products';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import usePullToRefresh from '../hooks/usePullToRefresh';

const Products = () => {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || '';
    const [filter, setFilter] = useState(location.state?.category || 'all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Pull to refresh functionality
    const handleRefresh = async () => {
        // Simulate refresh delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Re-apply filters (in real app, would fetch from API)
        applyFilters();
    };

    const { pullDistance, isRefreshing, progress } = usePullToRefresh(handleRefresh);

    // Update filter if location state changes (for in-page navigation or re-navigation)
    useEffect(() => {
        if (location.state?.category) {
            setFilter(location.state.category);
        }
    }, [location.state]);

    const applyFilters = () => {
        let result = products.filter(p => p.id !== 0); // Exclude Samsung (ID 0)

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

        // Apply price filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        setFilteredProducts(result);
    };

    useEffect(() => {
        setIsLoading(true);
        // Simulate initial loading
        const timer = setTimeout(() => {
            applyFilters();
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [filter, searchQuery, priceRange]);

    // Handle filter drawer apply
    const handleFilterApply = (filters) => {
        setFilter(filters.category);
        setPriceRange(filters.priceRange);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 sm:py-12 md:py-16 transition-colors duration-300 min-h-screen">
            <SEO
                title={searchQuery ? `Search Results for "${searchQuery}" - Catchy Electronics` : "Shop All Products - Catchy Electronics"}
                description="Explore our extensive collection of premium electronics including laptops, smartphones, monitors, and gaming accessories."
            />

            {/* Pull to Refresh Indicator */}
            {(pullDistance > 0 || isRefreshing) && (
                <div
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-200"
                    style={{
                        transform: `translate(-50%, ${Math.min(pullDistance, 60)}px)`,
                        opacity: Math.min(progress, 1)
                    }}
                >
                    <div className={`bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg ${isRefreshing ? 'animate-spin' : ''}`}>
                        <Loader2
                            size={24}
                            className={`text-primary ${isRefreshing ? '' : ''}`}
                            style={{ transform: `rotate(${progress * 360}deg)` }}
                        />
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 animate-fadeIn text-gray-900 dark:text-white">
                    Our Products
                </h1>

                {/* Mobile Filter Button */}
                <div className="md:hidden flex justify-center mb-6">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 font-medium"
                    >
                        <SlidersHorizontal size={18} />
                        Filters
                        {filter !== 'all' && (
                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                1
                            </span>
                        )}
                    </button>
                </div>

                {/* Desktop Filters */}
                <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
                    {['all', ...new Set(products.map(p => p.category).filter(Boolean))].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px] ${filter === cat
                                ? 'bg-gradient-primary text-white shadow-glow'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Desktop Price Filter */}
                <div className="hidden md:flex justify-center mb-8 px-4 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Price Range:</span>
                        <div className="flex items-center gap-3 w-full">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-6 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Min"
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                                    className="w-full pl-6 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Results Message */}
                {searchQuery && (
                    <div className="mb-6 text-center">
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                            Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "<span className="font-semibold text-gray-900 dark:text-white">{searchQuery}</span>"
                        </p>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="mt-2 text-xs sm:text-sm text-primary hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        ))
                    ) : (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                {/* No Results Message */}
                {!isLoading && filteredProducts.length === 0 && (
                    <div className="text-center py-12 animate-fadeIn">
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">No products found{searchQuery && ` for "${searchQuery}"`}</p>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="bg-gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-glow transition-all transform hover:-translate-y-1 min-h-[44px]"
                        >
                            View All Products
                        </button>
                    </div>
                )}
            </div>

            {/* Filter Drawer */}
            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={{ category: filter, priceRange }}
                onApply={handleFilterApply}
            />
        </div>
    );
};

export default Products;
