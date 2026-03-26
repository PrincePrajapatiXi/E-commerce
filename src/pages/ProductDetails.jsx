import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check, Truck, RotateCcw, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import SEO from '../components/SEO';
import { addToRecentlyViewed } from '../components/RecentlyViewed';
import useSwipeGesture from '../hooks/useSwipeGesture';
import useHaptic from '../hooks/useHaptic';

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();
    const { success } = useToast();
    const haptic = useHaptic();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [added, setAdded] = useState(false);
    const [selectedColor, setSelectedColor] = useState(product?.variations?.color?.[0]?.name || null);
    const [selectedStyle, setSelectedStyle] = useState(product?.variations?.style?.[0]?.name || null);
    const [showAllSpecs, setShowAllSpecs] = useState(false);

    // Swipe gesture for image gallery
    const handleSwipeLeft = () => {
        if (product && selectedImage < product.images.length - 1) {
            setSelectedImage(prev => prev + 1);
            haptic.light();
        }
    };

    const handleSwipeRight = () => {
        if (selectedImage > 0) {
            setSelectedImage(prev => prev - 1);
            haptic.light();
        }
    };

    const { bind: swipeBind, swipeOffset } = useSwipeGesture({
        onSwipeLeft: handleSwipeLeft,
        onSwipeRight: handleSwipeRight,
        threshold: 50,
    });

    // Track recently viewed products - must be before early return
    useEffect(() => {
        if (product) {
            addToRecentlyViewed(product);
        }
    }, [product]);

    // Reset selected image when product changes
    useEffect(() => {
        setSelectedImage(0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h2>
                <Link to="/" className="text-primary hover:underline">Back to Home</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        success(`Added ${quantity} ${product.name} to cart!`);
        haptic.success();
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Smart Related Products - shows products from same category, excluding current product
    const getRelatedProducts = () => {
        // Extract category - handle both single category and space-separated multiple categories
        const currentCategories = product.category.split(' ');

        // Filter products that:
        // 1. Are not the current product
        // 2. Share at least one category with current product
        const related = products.filter(p => {
            if (p.id === product.id) return false;

            const pCategories = p.category.split(' ');
            // Check if any category matches
            return pCategories.some(cat => currentCategories.includes(cat));
        });

        // If we have related products, return up to 4
        if (related.length > 0) {
            return related.slice(0, 4);
        }

        // Fallback: if no category matches, show random products excluding current
        return products.filter(p => p.id !== product.id).slice(0, 4);
    };

    const relatedProducts = getRelatedProducts();

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <SEO
                title={`${product.name} - Buy at Best Price`}
                description={product.description}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 bg-white p-6 sm:p-8 mb-12">
                    {/* Image Gallery */}
                    <div className="space-y-3 sm:space-y-4">
                        {/* Main Image with Swipe Support */}
                        <div
                            className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-card hover:shadow-card-hover transition-all relative touch-pan-y p-4"
                            {...swipeBind}
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-64 sm:h-80 md:h-96 object-contain transition-transform duration-300"
                                style={{
                                    transform: `translateX(${swipeOffset * 0.3}px)`,
                                }}
                            />

                            {/* Mobile Navigation Arrows */}
                            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none md:hidden">
                                {selectedImage > 0 && (
                                    <button
                                        onClick={() => { setSelectedImage(prev => prev - 1); haptic.light(); }}
                                        className="pointer-events-auto p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm active:scale-95 transition-transform"
                                    >
                                        <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
                                    </button>
                                )}
                                <div></div>
                                {selectedImage < product.images.length - 1 && (
                                    <button
                                        onClick={() => { setSelectedImage(prev => prev + 1); haptic.light(); }}
                                        className="pointer-events-auto p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm active:scale-95 transition-transform"
                                    >
                                        <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Image Dot Indicators (Mobile) */}
                        <div className="flex justify-center gap-2 md:hidden">
                            {product.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setSelectedImage(idx); haptic.selection(); }}
                                    className={`w-2 h-2 rounded-full transition-all ${selectedImage === idx
                                            ? 'bg-primary w-6'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Thumbnail Grid (Desktop) */}
                        <div className="hidden md:grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 gap-2 sm:gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all transform hover:scale-105 min-h-[44px] bg-white ${selectedImage === idx ? 'border-primary shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}`}
                                >
                                    <img src={img} alt="" loading="lazy" className="w-full h-16 sm:h-20 object-contain p-1" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* 1. Breadcrumb */}
                        <nav className="text-sm text-gray-500 mb-4">
                            <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-gray-900">{product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}</span>
                        </nav>

                        {/* 2. Product Title */}
                        {product?.badge && (
                            <div className="mb-2">
                                <span className="bg-[#FF9900] text-white text-[12px] font-bold px-2.5 py-1 rounded-[4px] shadow-sm">
                                    {product.badge}
                                </span>
                            </div>
                        )}
                        <h1 className="text-[24px] font-bold text-[#111] leading-tight mb-1">{product?.name}</h1>
                        
                        {product?.visitStoreLink && (
                            <div className="mb-2">
                                <a 
                                    href={product.visitStoreLink.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#0066C0] hover:text-[#C7511F] hover:underline text-sm font-medium transition-colors"
                                >
                                    {product.visitStoreLink.name}
                                </a>
                            </div>
                        )}

                        {/* 3. Rating */}
                        <div className="mb-4 border-b border-gray-100 pb-2">
                            <StarRating rating={product.rating} size={20} />
                        </div>

                        {/* 4. Price & 5. Taxes */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[#CC0C39] text-3xl font-light">-{product.discount}%</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-medium mt-1 text-[#111]">₹</span>
                                    <span className="text-3xl font-bold text-[#111]">
                                        {((product.price + (product.variations?.style?.find(s => s.name === selectedStyle)?.price_modifier || 0)) * quantity).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-[#565959] text-sm mb-1">
                                M.R.P.: <span className="line-through">₹{((product.mrp || product.price * 1.5) + (product.variations?.style?.find(s => s.name === selectedStyle)?.price_modifier || 0) * 1.5).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* 6. Trust Badges (Move up) */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <Truck className="text-primary w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-xs text-gray-900">Free Delivery</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <RotateCcw className="text-primary w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-xs text-gray-900">7 Days Return</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <ShieldCheck className="text-primary w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-xs text-gray-900">Genuine Product</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                <Award className="text-primary w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-xs text-gray-900">1 Year Warranty</p>
                                </div>
                            </div>
                        </div>

                        {/* Variations Section */}
                        {product.variations && (
                            <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">
                                {product.variations.style && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Style Name: <span className="text-primary font-bold">{selectedStyle}</span></h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.variations.style.map((style) => (
                                                <button
                                                    key={style.name}
                                                    onClick={() => { setSelectedStyle(style.name); haptic.selection(); }}
                                                    className={`px-4 py-2 rounded-md border-2 text-sm font-semibold transition-all ${selectedStyle === style.name
                                                            ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {style.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.variations.color && (
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Colour: <span className="text-primary font-bold">{selectedColor}</span></h3>
                                        <div className="flex flex-wrap gap-3">
                                            {product.variations.color.map((color) => (
                                                <button
                                                    key={color.name}
                                                    onClick={() => {
                                                        setSelectedColor(color.name);
                                                        const imgIndex = product.images.findIndex(img => img === color.image);
                                                        if (imgIndex !== -1) setSelectedImage(imgIndex);
                                                        haptic.selection();
                                                    }}
                                                    className={`w-12 h-12 rounded-full border-2 p-0.5 transition-all transform hover:scale-110 ${selectedColor === color.name
                                                            ? 'border-primary ring-2 ring-primary/20 scale-110 shadow-lg'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    title={color.name}
                                                >
                                                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                                        <img src={color.image} alt={color.name} className="w-full h-full object-contain" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 7. Quantity + Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 border-b border-gray-100 pb-10">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg w-full sm:w-auto overflow-hidden">
                                <button
                                    onClick={() => { setQuantity(Math.max(1, quantity - 1)); haptic.light(); }}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold text-lg min-w-[44px] text-gray-900 active:bg-gray-200"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center border-none focus:ring-0 font-semibold bg-transparent text-gray-900"
                                />
                                <button
                                    onClick={() => { setQuantity(quantity + 1); haptic.light(); }}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold text-lg min-w-[44px] text-gray-900 active:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`flex-1 flex items-center justify-center px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-md active:scale-95 ${added
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#FFD814] hover:bg-[#F7CA00] text-[#111] border border-[#F2C200]'
                                    }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="mr-2" size={20} /> Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-2" size={20} /> Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        {/* 8. Specifications Table */}
                        {product.features && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-[#111] mb-4">Technical Details</h3>
                                <div className="transition-all duration-500 w-full">
                                    {(showAllSpecs ? product?.features : product?.features?.slice(0, 6))?.map((feature, idx) => {
                                        let key, value;
                                        
                                        if (typeof feature === 'string') {
                                            // Handle formatting for both 【Title】 : Description and Label : Value
                                            const bracketMatch = feature.match(/^【(.*?)】\s*:\s*(.*)/);
                                            const colonMatch = feature.match(/^(.*?)\s*:\s*(.*)/);

                                            if (bracketMatch) {
                                                key = bracketMatch[1];
                                                value = bracketMatch[2];
                                            } else if (colonMatch) {
                                                key = colonMatch[1];
                                                value = colonMatch[2];
                                            }
                                            
                                            if (!key || !value) {
                                                // Fallback for simple strings
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="py-2 px-3 border-b border-[#e7e7e7] last:border-0 bg-white"
                                                    >
                                                        <span className="text-[13px] text-[#333] leading-relaxed">{feature}</span>
                                                    </div>
                                                );
                                            }
                                        } else if (typeof feature === 'object' && feature !== null) {
                                            // New format: { label, value }
                                            key = feature.label;
                                            value = feature.value;
                                        }

                                        if (key && value) {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="grid grid-cols-[180px_1fr] py-2 px-3 border-b border-[#e7e7e7] last:border-0 bg-white items-start"
                                                >
                                                    <span className="text-[13px] font-bold text-[#111]">{key.trim()}</span>
                                                    <span className="text-[13px] text-[#333]">{value.trim()}</span>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>

                                {product.features.length > 6 && (
                                    <div className="flex justify-start mt-2">
                                        <button
                                            onClick={() => { setShowAllSpecs(!showAllSpecs); haptic.light(); }}
                                            className="flex items-center gap-1 text-[#007185] hover:text-[#C7511F] hover:underline font-medium text-sm transition-colors group"
                                        >
                                            <ChevronRight
                                                size={14}
                                                className={`transition-transform duration-300 ${showAllSpecs ? '-rotate-90' : 'rotate-90'}`}
                                            />
                                            <span>{showAllSpecs ? 'See less' : 'See more'}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 9. About this item */}
                        <div className="mb-8 pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-[#111] mb-3">About this item</h3>
                            <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#333] leading-relaxed">
                                {product?.description?.split(/\n|(?=【)/).filter(line => line.trim()).map((line, idx) => (
                                    <li key={idx} className="mb-2 last:mb-0">
                                        {line.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                Related Products
                            </h2>
                            <Link
                                to="/products"
                                className="text-primary hover:text-orange-600 font-semibold text-sm sm:text-base transition-colors"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
