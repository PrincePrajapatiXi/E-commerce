import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-gradient-primary text-white p-3 sm:p-4 rounded-full shadow-glow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-fadeIn"
                    aria-label="Back to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </>
    );
};

export default BackToTop;
