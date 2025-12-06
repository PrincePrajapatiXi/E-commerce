import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowModal(true);
        }, 2000); // 2 second animation
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <ShoppingCart size={64} className="text-gray-300 mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some products to get started!</p>
                <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-500">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Subtotal</div>
                            </div>

                            {cart.map(item => (
                                <div key={item.id} className="p-4 border-b">
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                                        <div className="col-span-3 flex items-center space-x-4">
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-20 h-20 object-contain bg-gray-50 rounded" />
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            </div>
                                        </div>

                                        <div className="text-center">₹ {item.price.toLocaleString()}</div>

                                        <div className="flex justify-center">
                                            <div className="flex items-center border rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100"
                                                >-</button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                    className="w-10 text-center border-none focus:ring-0 p-1"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100"
                                                >+</button>
                                            </div>
                                        </div>

                                        <div className="text-right font-bold">₹ {(item.price * item.quantity).toLocaleString()}</div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute right-4 text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        {/* Product Info */}
                                        <div className="flex items-start space-x-3 mb-4">
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-24 h-24 object-contain bg-gray-50 rounded flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                                                <div className="text-lg font-bold text-primary">₹ {item.price.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Quantity and Subtotal */}
                                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-3">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm font-medium text-gray-600">Quantity:</span>
                                                <div className="flex items-center border rounded bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                                                    >-</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 text-center border-none focus:ring-0 p-1 font-semibold"
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500 mb-1">Subtotal</div>
                                                <div className="text-lg font-bold text-gray-900">₹ {(item.price * item.quantity).toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-sm hover:underline flex items-center justify-center w-full py-2"
                                        >
                                            <Trash2 size={16} className="mr-1" /> Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/" className="inline-flex items-center text-primary hover:underline">
                            <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹ {getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{getCartTotal() > 1000 ? 'Free' : '₹ 99'}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹ {(getCartTotal() + (getCartTotal() > 1000 ? 0 : 99)).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg flex items-center justify-center disabled:opacity-70"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    'Proceed to Checkout'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coming Soon Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-bounce-in">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
                            <p className="text-gray-600 mb-6">
                                The checkout feature will be added soon. Thank you for your patience!
                            </p>
                            <button
                                onClick={closeModal}
                                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes bounce-in {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.5s ease-out;
                }
            `}</style>
        </>
    );
};

// Helper icon component
const ShoppingCart = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

export default Cart;
