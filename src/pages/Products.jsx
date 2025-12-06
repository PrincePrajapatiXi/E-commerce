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
        <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
                    Our Products
                </h1>

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
                            onClick={() => window.location.href = '/products'}
                            className="mt-2 text-xs sm:text-sm text-primary hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* No Results Message */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No products found{searchQuery && ` for "${searchQuery}"`}</p>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
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
