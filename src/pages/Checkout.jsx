import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { Check, CreditCard, Truck, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cart.length === 0 && step !== 3) {
            navigate('/cart');
        }
    }, [cart, step, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateAddress = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP Code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = () => {
        // Mock validation for payment
        const newErrors = {};
        if (!formData.cardName) newErrors.cardName = 'Name on card is required';
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (validateAddress()) {
                setStep(2);
                window.scrollTo(0, 0);
            }
        } else if (step === 2) {
            if (validatePayment()) {
                handlePlaceOrder();
            }
        }
    };

    const handleBackInfo = () => {
        setStep(Math.max(1, step - 1));
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
            setOrderId(newOrderId);
            clearCart();
            setStep(3);
            window.scrollTo(0, 0);
        }, 2000);
    };

    const total = getCartTotal();
    const shipping = total > 1000 ? 0 : 99;
    const grandTotal = total + shipping;

    if (step === 3) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={48} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Thank you for your purchase. Your order ID is <span className="font-bold text-gray-900">{orderId}</span>.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto text-left">
                    <h3 className="font-semibold mb-2">Detailed confirmation sent to:</h3>
                    <p className="text-gray-700">{formData.email}</p>
                </div>
                <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SEO title="Checkout - Catchy Electronics" description="Complete your purchase securely." />
            <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />
            {/* Steps Indicator */}
            <div className="mb-12">
                <div className="flex items-center justify-center">
                    <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>1</div>
                        <span className="ml-2 font-medium hidden sm:block">Shipping</span>
                    </div>
                    <div className={`w-24 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>2</div>
                        <span className="ml-2 font-medium hidden sm:block">Payment</span>
                    </div>
                    <div className={`w-24 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>3</div>
                        <span className="ml-2 font-medium hidden sm:block">Confirmation</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Form Area */}
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <Truck className="mr-3" /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <CreditCard className="mr-3" /> Payment Details
                            </h2>
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-sm text-blue-700">
                                This is a mock checkout. No real payment will be processed.
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        placeholder="0000 0000 0000 0000"
                                        className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            placeholder="MM/YY"
                                            className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="123"
                                            className={`w-full p-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        {step > 1 ? (
                            <button
                                onClick={handleBackInfo}
                                className="flex items-center text-gray-600 hover:text-gray-900 font-semibold px-6 py-3"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Back
                            </button>
                        ) : (
                            <Link
                                to="/cart"
                                className="flex items-center text-gray-600 hover:text-gray-900 font-semibold px-6 py-3"
                            >
                                <ArrowLeft size={20} className="mr-2" /> Return to Cart
                            </Link>
                        )}

                        <button
                            onClick={handleNextStep}
                            disabled={isProcessing}
                            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg flex items-center justify-center disabled:opacity-70 min-w-[160px]"
                        >
                            {isProcessing ? (
                                'Processing...'
                            ) : step === 2 ? (
                                'Place Order'
                            ) : (
                                <>
                                    Next Step <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <ShoppingBag className="mr-2" size={20} /> Order Summary
                        </h3>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    <div className="relative">
                                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 rounded border border-gray-100" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h4>
                                        <p className="text-sm text-gray-500">₹ {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹ {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹ ${shipping}`}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>₹ {grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
