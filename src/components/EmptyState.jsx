import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Package, Heart, MapPin } from 'lucide-react';

const icons = {
    cart: ShoppingCart,
    search: Search,
    orders: Package,
    wishlist: Heart,
    address: MapPin,
};

const EmptyState = ({ type = 'cart', title, description, actionText, actionLink, onAction }) => {
    const Icon = icons[type] || Package;

    const defaults = {
        cart: {
            title: 'Your cart is empty',
            description: 'Looks like you haven\'t added anything to your cart yet. Start exploring our products!',
            actionText: 'Start Shopping',
            actionLink: '/products',
        },
        search: {
            title: 'No products found',
            description: 'We couldn\'t find any products matching your search. Try different keywords!',
            actionText: 'Browse All Products',
            actionLink: '/products',
        },
        orders: {
            title: 'No orders yet',
            description: 'You haven\'t placed any orders yet. Start shopping and your orders will appear here!',
            actionText: 'Start Shopping',
            actionLink: '/products',
        },
        wishlist: {
            title: 'Your wishlist is empty',
            description: 'Save products you love by clicking the heart icon. Your liked items will show up here!',
            actionText: 'Discover Products',
            actionLink: '/products',
        },
        address: {
            title: 'No addresses saved',
            description: 'Save your shipping addresses for faster checkout next time!',
            actionText: 'Add Address',
            actionLink: null,
        },
    };

    const config = defaults[type] || defaults.cart;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
            {/* Animated Icon */}
            <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-orange-100 dark:from-primary/20 dark:to-orange-900/20 rounded-full flex items-center justify-center animate-pulse-slow">
                    <Icon size={40} className="text-primary" strokeWidth={1.5} />
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-300/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {title || config.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6 leading-relaxed">
                {description || config.description}
            </p>

            {/* Action */}
            {(actionLink || config.actionLink) ? (
                <Link
                    to={actionLink || config.actionLink}
                    className="inline-flex items-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold shadow-button hover:shadow-glow transition-all transform hover:-translate-y-1 hover:scale-105 btn-ripple"
                >
                    {actionText || config.actionText}
                </Link>
            ) : onAction ? (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-full font-semibold shadow-button hover:shadow-glow transition-all transform hover:-translate-y-1 hover:scale-105 btn-ripple"
                >
                    {actionText || config.actionText}
                </button>
            ) : null}
        </div>
    );
};

export default EmptyState;
