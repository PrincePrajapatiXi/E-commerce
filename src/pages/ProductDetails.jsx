import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-96 object-contain"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`border-2 rounded-md overflow-hidden ${selectedImage === idx ? 'border-primary' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" loading="lazy" className="w-full h-20 object-contain bg-white" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-gray-900">{product.name}</span>
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} className={i < product.rating ? 'fill-current' : 'text-gray-300'} />
                            ))}
                        </div>
                        <span className="text-gray-500">({product.rating}/5)</span>
                    </div>

                    <p className="text-3xl font-bold text-primary mb-6">₹ {product.price.toLocaleString()}</p>

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

                    <div className="flex items-center space-x-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 hover:bg-gray-100"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                readOnly
                                className="w-12 text-center border-none focus:ring-0"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={added}
                            className={`flex-1 flex items-center justify-center px-8 py-3 rounded-md font-semibold transition-all duration-300 ${added
                                ? 'bg-green-500 text-white'
                                : 'bg-primary hover:bg-red-600 text-white'
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
        </div>
    );
};

export default ProductDetails;
