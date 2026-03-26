import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { success } = useToast();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        // Reset when product changes
        setSelectedImage(0);
        setQuantity(1);
    }, [product]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, selectedImage]);

    if (!isOpen || !product) return null;

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        success(`Added ${quantity} ${product.name} to cart!`);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

            {/* Modal */}
            <div
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-700/90 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md"
                >
                    <X size={24} className="text-gray-600 dark:text-gray-300" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Image Gallery */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />

                            {/* Navigation Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all"
                                    >
                                        <ChevronLeft size={20} className="text-gray-700 dark:text-gray-200" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all"
                                    >
                                        <ChevronRight size={20} className="text-gray-700 dark:text-gray-200" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                                ? 'border-primary shadow-glow'
                                                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {product.name}
                        </h2>

                        {/* Rating */}
                        <div className="mb-4">
                            <StarRating rating={product.rating} size={18} />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[#CC0C39] text-2xl font-light">-{product.discount}%</span>
                                <span className="text-3xl font-bold text-[#111]">
                                    ₹{product.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="text-[#565959] text-sm">
                                M.R.P.: <span className="line-through">₹{(product.mrp || product.price * 1.5).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {product.description}
                        </p>

                        {/* Features */}
                        {product.features && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h3>
                                <ul className="space-y-1">
                                    {product?.features?.slice(0, 4).map((feature, idx) => {
                                        let displayValue;
                                        if (typeof feature === 'string') {
                                            displayValue = feature;
                                        } else if (typeof feature === 'object' && feature !== null) {
                                            displayValue = `${feature.label}: ${feature.value}`;
                                        }

                                        return (
                                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {displayValue}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                            <div className="flex items-center border dark:border-gray-600 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 font-medium dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-primary text-white py-3 px-6 rounded-xl font-semibold hover:shadow-glow transition-all transform hover:-translate-y-0.5"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 px-6 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
