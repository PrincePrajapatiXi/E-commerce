import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
    const [filter, setFilter] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || '';

    useEffect(() => {
        let result = products.filter(p => p.id !== 11); // Exclude Samsung (ID 11)

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

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-10 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 animate-fadeIn">
                    Our Products
                </h1>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
                    {['all', 'laptop', 'monitor', 'accessory', 'mobile', 'gaming'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 min-h-[44px] ${filter === cat
                                ? 'bg-gradient-primary text-white shadow-glow'
                                : 'bg-white text-gray-600 hover:bg-gray-200 shadow-md'
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
                            onClick={() => window.location.href = '/products'}
                            className="mt-2 text-xs sm:text-sm text-primary hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* No Results Message */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 animate-fadeIn">
                        <p className="text-gray-600 text-lg mb-4">No products found{searchQuery && ` for "${searchQuery}"`}</p>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="bg-gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-glow transition-all transform hover:-translate-y-1 min-h-[44px]"
                        >
                            View All Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
