import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle, Loader2 } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus('error');
            setErrorMessage('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => {
            setStatus('idle');
        }, 3000);
    };

    return (
        <section className="relative py-16 sm:py-20 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 dark:from-primary/10 dark:via-purple-500/10 dark:to-blue-500/10" />

            {/* Animated Background Orbs */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="glass dark:glass-dark rounded-3xl p-8 sm:p-12 text-center shadow-xl">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-primary shadow-glow">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-primary">Catchy</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
                        Subscribe to our newsletter and be the first to know about new products, exclusive deals, and tech updates!
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        {status === 'success' ? (
                            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-2xl animate-fadeIn">
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-semibold">Thanks for subscribing!</span>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${status === 'error'
                                                    ? 'border-red-400 focus:border-red-500'
                                                    : 'border-gray-200 dark:border-gray-700 focus:border-primary'
                                                }`}
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-button hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 min-w-[140px]"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Subscribing...</span>
                                            </>
                                        ) : (
                                            <span>Subscribe</span>
                                        )}
                                    </button>
                                </div>

                                {/* Error Message */}
                                {status === 'error' && (
                                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-left animate-fadeIn">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>
                        )}
                    </form>

                    {/* Trust Text */}
                    <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                        🔒 We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
