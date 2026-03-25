import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
    const location = useLocation();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/products', icon: Grid3X3, label: 'Products' },
        { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
        { path: '/account', icon: User, label: 'Account' },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-glass border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map(({ path, icon: Icon, label, badge }) => {
                    const active = isActive(path);
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-200 ${active
                                    ? 'text-primary'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {/* Active indicator */}
                            {active && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-primary rounded-b-full animate-fadeIn" />
                            )}

                            <div className="relative">
                                <Icon
                                    size={22}
                                    className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}
                                    strokeWidth={active ? 2.5 : 2}
                                />
                                {/* Cart badge */}
                                {badge > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm animate-pulse-slow">
                                        {badge > 99 ? '99+' : badge}
                                    </span>
                                )}
                            </div>

                            <span className={`text-[10px] mt-1 font-medium transition-all ${active ? 'opacity-100' : 'opacity-70'}`}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
