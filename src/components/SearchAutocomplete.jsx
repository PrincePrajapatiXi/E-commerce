import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { products } from '../data/products';

const SearchAutocomplete = ({ isMobile = false, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const trendingSearches = ['Gaming Laptop', 'iPhone', 'Headphone', 'Monitor', 'Keyboard'];

    useEffect(() => {
        if (query.trim().length < 1) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            const q = query.toLowerCase();
            const filtered = products
                .filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    (p.description && p.description.toLowerCase().includes(q))
                )
                .slice(0, 6);
            setResults(filtered);
        }, 150);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && results[selectedIndex]) {
                goToProduct(results[selectedIndex]);
            } else if (query.trim()) {
                goToSearch();
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const goToProduct = (product) => {
        navigate(`/product/${product.id}`);
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const goToSearch = () => {
        navigate('/products', { state: { searchQuery: query.trim() } });
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const handleTrendingClick = (term) => {
        setQuery(term);
        setIsOpen(true);
        inputRef.current?.focus();
    };

    const highlightMatch = (text, query) => {
        if (!query.trim()) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <span className="text-primary font-semibold">{text.slice(idx, idx + query.length)}</span>
                {text.slice(idx + query.length)}
            </>
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Input */}
            <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 hover:shadow-md transition-shadow ${isOpen ? 'ring-2 ring-primary/50' : ''}`}>
                <Search size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); setSelectedIndex(-1); }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className={`bg-transparent border-none focus:outline-none text-sm dark:text-gray-200 dark:placeholder-gray-400 ${isMobile ? 'w-full' : 'w-32 lg:w-48 focus:w-64 transition-all duration-300'}`}
                />
                {query && (
                    <button onClick={() => { setQuery(''); setResults([]); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1">
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full mt-2 w-full min-w-[320px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeIn right-0 lg:left-auto">
                    {results.length > 0 ? (
                        <div>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                Products
                            </div>
                            {results.map((product, index) => (
                                <button
                                    key={product.id}
                                    onClick={() => goToProduct(product)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedIndex === index ? 'bg-gray-50 dark:bg-gray-700/50' : ''}`}
                                >
                                    <img
                                        src={product.images?.[0]}
                                        alt=""
                                        className="w-12 h-12 object-contain rounded-lg bg-white flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {highlightMatch(product.name, query)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            ₹{product.price?.toLocaleString()}
                                            {product.discount > 0 && (
                                                <span className="ml-2 text-green-600 dark:text-green-400 font-medium">{product.discount}% off</span>
                                            )}
                                        </p>
                                    </div>
                                </button>
                            ))}
                            {query.trim() && (
                                <button
                                    onClick={goToSearch}
                                    className="w-full px-4 py-3 text-sm text-primary font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 transition-colors text-center"
                                >
                                    See all results for "{query}" →
                                </button>
                            )}
                        </div>
                    ) : query.trim() ? (
                        <div className="px-4 py-8 text-center">
                            <Search size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">No products found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="px-4 py-3">
                            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <TrendingUp size={12} /> Trending Searches
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingSearches.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => handleTrendingClick(term)}
                                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-all"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchAutocomplete;
