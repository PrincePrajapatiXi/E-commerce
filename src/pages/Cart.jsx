import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import useHaptic from '../hooks/useHaptic';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const haptic = useHaptic();

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

    const total = getCartTotal();
    const shipping = total > 1000 ? 0 : 99;
    const grandTotal = total + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <EmptyState type="cart" />
            </div>
        );
    }

    return (
        <>
            <SEO title="Shopping Cart - Catchy Electronics" description="Review your selected items and proceed to secure checkout." />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-40 md:pb-12">
                <Breadcrumb items={[{ label: 'Cart' }]} />
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-500 dark:text-gray-400">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Subtotal</div>
                            </div>

                            {cart.map(item => (
                                <div key={item.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                                        <div className="col-span-3 flex items-center space-x-4">
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-20 h-20 object-contain bg-gray-50 dark:bg-gray-700 rounded" />
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                                            </div>
                                        </div>

                                        <div className="text-center text-gray-700 dark:text-gray-300">₹ {item.price.toLocaleString()}</div>

                                        <div className="flex justify-center">
                                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                >-</button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                    className="w-10 text-center border-none focus:ring-0 p-1 bg-transparent text-gray-900 dark:text-white"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                >+</button>
                                            </div>
                                        </div>

                                        <div className="text-right font-bold text-gray-900 dark:text-white">₹ {(item.price * item.quantity).toLocaleString()}</div>

                                        <button
                                            onClick={() => { removeFromCart(item.id); haptic.medium(); }}
                                            className="absolute right-4 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        {/* Product Info */}
                                        <div className="flex items-start space-x-3 mb-4">
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-gray-50 dark:bg-gray-700 rounded flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">{item.name}</h3>
                                                <div className="text-base sm:text-lg font-bold text-primary">₹ {item.price.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Quantity and Subtotal */}
                                        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-3">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Qty:</span>
                                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                                                    <button
                                                        onClick={() => { updateQuantity(item.id, item.quantity - 1); haptic.light(); }}
                                                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-lg active:bg-gray-200 dark:active:bg-gray-500 transition-colors text-gray-700 dark:text-gray-300"
                                                    >-</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-10 sm:w-12 text-center border-none focus:ring-0 p-1 font-semibold text-sm sm:text-base bg-transparent text-gray-900 dark:text-white"
                                                    />
                                                    <button
                                                        onClick={() => { updateQuantity(item.id, item.quantity + 1); haptic.light(); }}
                                                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-lg active:bg-gray-200 dark:active:bg-gray-500 transition-colors text-gray-700 dark:text-gray-300"
                                                    >+</button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">Subtotal</div>
                                                <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">₹ {(item.price * item.quantity).toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => { removeFromCart(item.id); haptic.medium(); }}
                                            className="text-red-500 text-sm hover:underline flex items-center justify-center w-full py-3 active:bg-red-50 dark:active:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900"
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

                    {/* Order Summary - Desktop */}
                    <div className="lg:col-span-1 hidden md:block">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹ {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹ ${shipping}`}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-gray-900 dark:text-white">₹ {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg flex items-center justify-center text-center block"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Cart Summary */}
            <div className="fixed bottom-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl safe-area-bottom">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total ({cart.length} items)</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">₹ {grandTotal.toLocaleString()}</p>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={() => haptic.medium()}
                            className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
                        >
                            <ShoppingBag size={18} />
                            Checkout
                        </Link>
                    </div>
                    {shipping === 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 text-center">🎉 You qualify for FREE shipping!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
