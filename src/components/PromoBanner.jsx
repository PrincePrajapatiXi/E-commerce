import React, { useState, useEffect } from 'react';
import { X, Zap, Clock } from 'lucide-react';

const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Check if banner was closed in this session
    useEffect(() => {
        const closed = sessionStorage.getItem('promoBannerClosed');
        if (closed) setIsVisible(false);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('promoBannerClosed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(255,255,255,0.1) 10px,
                        rgba(255,255,255,0.1) 20px
                    )`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-2 sm:py-3">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
                    {/* Flash Icon */}
                    <div className="hidden sm:flex items-center gap-2">
                        <Zap className="w-5 h-5 animate-pulse text-yellow-300" fill="currentColor" />
                        <span className="font-bold text-sm sm:text-base">FLASH SALE</span>
                    </div>

                    {/* Main Text */}
                    <span className="text-xs sm:text-sm font-medium">
                        Use code <span className="bg-white/20 px-2 py-0.5 rounded font-bold">SAVE20</span> for 20% OFF
                    </span>

                    {/* Countdown */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="w-4 h-4" />
                        <div className="flex gap-1">
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono font-bold">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span>:</span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono font-bold">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span>:</span>
                            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono font-bold">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close banner"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PromoBanner;
