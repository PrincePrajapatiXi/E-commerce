import React, { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { products } from '../data/products';

const FilterDrawer = ({ isOpen, onClose, filters, onApply }) => {
    const [localCategory, setLocalCategory] = useState(filters.category || 'all');
    const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange || { min: 0, max: 200000 });

    const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

    const handleApply = () => {
        onApply({
            category: localCategory,
            priceRange: localPriceRange,
        });
        onClose();
    };

    const handleReset = () => {
        setLocalCategory('all');
        setLocalPriceRange({ min: 0, max: 200000 });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fadeIn"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slideUp">
                <div className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto safe-area-bottom">
                    {/* Handle */}
                    <div className="flex justify-center py-3">
                        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={20} className="text-primary" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setLocalCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${localCategory === cat
                                                ? 'bg-gradient-primary text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={localPriceRange.min}
                                        onChange={(e) => setLocalPriceRange({ ...localPriceRange, min: parseInt(e.target.value) || 0 })}
                                        className="w-full pl-7 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Min"
                                    />
                                </div>
                                <span className="text-gray-400">—</span>
                                <div className="flex-1 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={localPriceRange.max}
                                        onChange={(e) => setLocalPriceRange({ ...localPriceRange, max: parseInt(e.target.value) || 0 })}
                                        className="w-full pl-7 pr-3 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 p-6 pt-0">
                        <button
                            onClick={handleReset}
                            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <RotateCcw size={18} />
                            Reset
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterDrawer;
