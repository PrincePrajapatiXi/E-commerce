import React from 'react';
import { Truck, Shield, RefreshCw, CreditCard, Package, Award } from 'lucide-react';

const TrustBadges = () => {
    const badges = [
        {
            icon: <Truck size={24} />,
            title: 'Free Delivery',
            description: 'On orders above ₹999'
        },
        {
            icon: <RefreshCw size={24} />,
            title: 'Easy Returns',
            description: '30 days return policy'
        },
        {
            icon: <Shield size={24} />,
            title: 'Secure Payment',
            description: '100% secure transactions'
        },
        {
            icon: <Award size={24} />,
            title: 'Warranty',
            description: 'Up to 2 years coverage'
        }
    ];

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 sm:py-12 my-8 sm:my-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <div className="text-primary mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {badge.icon}
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                                {badge.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                                {badge.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
