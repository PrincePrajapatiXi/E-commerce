import React, { useState, useEffect, useRef } from 'react';
import { Users, Package, Star, Award } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: 50000,
        suffix: '+',
        label: 'Happy Customers',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
        icon: Package,
        value: 10000,
        suffix: '+',
        label: 'Products Sold',
        color: 'text-green-500',
        bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
        icon: Star,
        value: 4.9,
        suffix: '/5',
        label: 'Average Rating',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        decimal: true
    },
    {
        icon: Award,
        value: 15,
        suffix: '+',
        label: 'Years Experience',
        color: 'text-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
];

const AnimatedCounter = ({ value, suffix, decimal = false, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;

            if (step >= steps) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, isVisible]);

    const displayValue = decimal ? count.toFixed(1) : Math.floor(count).toLocaleString();

    return (
        <span className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
};

const StatsCounter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-12 sm:py-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Trusted by thousands of customers for quality electronics and exceptional service
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 ${isVisible ? 'animate-fadeIn' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Icon */}
                                <div className={`inline-flex p-3 sm:p-4 rounded-xl ${stat.bgColor} mb-4`}>
                                    <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                                </div>

                                {/* Value */}
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        decimal={stat.decimal}
                                        isVisible={isVisible}
                                    />
                                </div>

                                {/* Label */}
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
