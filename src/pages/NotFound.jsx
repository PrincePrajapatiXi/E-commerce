import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
            <SEO title="Page Not Found - Catchy Electronics" description="The page you're looking for doesn't exist." />
            <div className="text-center max-w-lg animate-fadeIn">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-primary leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
                    The page you're looking for doesn't exist or has been moved. 
                    Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold shadow-button hover:shadow-glow-lg transition-all transform hover:-translate-y-1 hover:scale-105 min-h-[44px] btn-ripple"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:-translate-y-1 shadow-button min-h-[44px] btn-ripple"
                    >
                        <Search size={18} />
                        Browse Products
                    </Link>
                </div>

                {/* Back Link */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 inline-flex items-center text-primary hover:text-orange-600 font-medium text-sm transition-colors group"
                >
                    <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                    Go back to previous page
                </button>
            </div>
        </div>
    );
};

export default NotFound;
