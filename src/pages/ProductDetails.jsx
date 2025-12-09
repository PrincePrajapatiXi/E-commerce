import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/" className="text-primary hover:underline">Back to Home</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
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
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-12">
                    {/* Image Gallery */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 shadow-card hover:shadow-card-hover transition-all">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-64 sm:h-80 md:h-96 object-contain transition-transform duration-500"
                            />
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 gap-2 sm:gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all transform hover:scale-105 min-h-[44px] ${selectedImage === idx ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <img src={img} alt="" loading="lazy" className="w-full h-16 sm:h-20 object-contain bg-white" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <nav className="text-sm text-gray-500 mb-4">
                            <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-gray-900">{product.name}</span>
                        </nav>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className={i < product.rating ? 'fill-current' : 'text-gray-300'} />
                                ))}
                            </div>
                            <span className="text-gray-500">({product.rating}/5)</span>
                        </div>

                        <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">₹ {product.price.toLocaleString()}</p>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            {product.features && (
                                <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg w-full sm:w-auto">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold text-lg min-w-[44px] min-h-[44px]"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-16 text-center border-none focus:ring-0 font-semibold"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-100 transition-colors font-semibold text-lg min-w-[44px] min-h-[44px]"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className={`flex-1 flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 min-h-[44px] btn-ripple ${added
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-gradient-primary hover:shadow-glow text-white'
                                    }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="mr-2" /> Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-2" /> Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
