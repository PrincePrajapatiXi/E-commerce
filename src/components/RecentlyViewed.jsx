import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';

const STORAGE_KEY = 'recently_viewed_products';
const MAX_PRODUCTS = 6;

// Helper to get recently viewed from localStorage
export const getRecentlyViewed = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

// Helper to add a product to recently viewed
export const addToRecentlyViewed = (product) => {
    if (!product || !product.id) return;

    try {
        let viewed = getRecentlyViewed();

        // Remove if already exists
        viewed = viewed.filter(p => p.id !== product.id);

        // Add to beginning
        viewed.unshift({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            rating: product.rating,
        });

        // Limit to MAX_PRODUCTS
        viewed = viewed.slice(0, MAX_PRODUCTS);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
    } catch (e) {
        console.error('Error saving to recently viewed:', e);
    }
};

// Helper to clear recently viewed
export const clearRecentlyViewed = () => {
    localStorage.removeItem(STORAGE_KEY);
};

const RecentlyViewed = () => {
    const [products, setProducts] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showClear, setShowClear] = useState(false);

    useEffect(() => {
        setProducts(getRecentlyViewed());

        // Listen for storage changes (in case viewed from another tab)
        const handleStorage = () => setProducts(getRecentlyViewed());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // Refresh on navigation
    useEffect(() => {
        const interval = setInterval(() => {
            setProducts(getRecentlyViewed());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (products.length === 0) return null;

    const handleScroll = (direction) => {
        const container = document.getElementById('recently-viewed-scroll');
        if (container) {
            const scrollAmount = 280;
            const newPosition = direction === 'left'
                ? Math.max(0, scrollPosition - scrollAmount)
                : scrollPosition + scrollAmount;
            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    const handleClear = () => {
        clearRecentlyViewed();
        setProducts([]);
    };

    return (
        <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Recently Viewed
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Clear Button */}
                        <button
                            onClick={handleClear}
                            onMouseEnter={() => setShowClear(true)}
                            onMouseLeave={() => setShowClear(false)}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            title="Clear history"
                        >
                            <X size={18} />
                        </button>

                        {/* Navigation Arrows */}
                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => handleScroll('left')}
                                className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition-all"
                            >
                                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={() => handleScroll('right')}
                                className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition-all"
                            >
                                <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Carousel */}
                <div
                    id="recently-viewed-scroll"
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                    onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
                >
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="flex-shrink-0 w-[200px] sm:w-[240px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 snap-start group"
                        >
                            {/* Image */}
                            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Product Info */}
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <p className="font-bold text-transparent bg-clip-text bg-gradient-primary">
                                ₹{product.price.toLocaleString()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewed;
