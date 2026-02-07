import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowQuickView(true);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-card hover:shadow-card-hover dark:shadow-gray-900/30 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 group relative overflow-hidden">
                {/* Stock Badge */}
                {product.stock !== undefined && (
                    <div className="absolute top-2 left-2 z-10">
                        {product.stock > 10 ? (
                            <span className="bg-success/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                In Stock
                            </span>
                        ) : product.stock > 0 ? (
                            <span className="bg-warning/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                Only {product.stock} left
                            </span>
                        ) : (
                            <span className="bg-error/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                Out of Stock
                            </span>
                        )}
                    </div>
                )}

                {/* Hover overlay with actions */}
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                        onClick={handleWishlistToggle}
                        className={`bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 ${inWishlist ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30' : 'hover:bg-primary hover:text-white'
                            }`}
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={16} className={inWishlist ? 'fill-current' : ''} />
                    </button>
                    <button
                        onClick={handleQuickView}
                        className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110"
                        aria-label="Quick view"
                    >
                        <Eye size={16} />
                    </button>
                </div>

                <Link to={`/product/${product.id}`} className="block mb-3 sm:mb-4 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700 relative">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-32 sm:h-40 lg:h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <div className="flex-grow">
                    <Link to={`/product/${product.id}`}>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[40px] sm:min-h-[3rem]">
                            {product.name}
                        </h4>
                    </Link>

                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${i < product.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 dark:text-gray-600'
                                    }`}
                            />
                        ))}
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1">({product.rating})</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 hidden sm:block">
                        {product.description}
                    </p>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            ₹ {product.price.toLocaleString()}
                        </p>
                        {product.oldPrice && (
                            <p className="text-[10px] sm:text-sm text-gray-400 line-through">
                                ₹ {product.oldPrice.toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* View Details Button */}
                    <Link
                        to={`/product/${product.id}`}
                        className="block w-full bg-gradient-primary hover:shadow-glow text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-button hover:shadow-button-hover btn-ripple text-xs sm:text-sm min-h-[36px] sm:min-h-[44px] flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={16} />
                        <span>View Details</span>
                    </Link>
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
};

export default ProductCard;

