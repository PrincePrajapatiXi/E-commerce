import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';

const FlashSaleTimer = ({ endTime, title = "Flash Sale Deals" }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(endTime) - +new Date();
            let newTimeLeft = { hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                newTimeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return newTimeLeft;
        };

        setTimeLeft(calculateTimeLeft());
        
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    // Format numbers with leading zeros
    const format = (num) => num.toString().padStart(2, '0');

    return (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center gap-4 z-10">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-inner">
                    <Zap size={32} className="text-yellow-300 fill-yellow-300 animate-pulse" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight">{title}</h2>
                    <p className="text-white/80 font-medium text-sm sm:text-base">Hurry up! Offers end soon.</p>
                </div>
            </div>

            <div className="flex items-center gap-3 z-10">
                <div className="hidden sm:flex items-center gap-2 mr-2 text-white/90">
                    <Timer size={20} />
                    <span className="font-semibold uppercase tracking-wider text-sm">Ends In</span>
                </div>
                
                <div className="flex gap-2 text-center">
                    <div className="bg-white text-red-600 w-14 sm:w-16 py-2 sm:py-3 rounded-xl shadow-md flex flex-col items-center justify-center transform transition-transform hover:scale-105">
                        <span className="text-2xl sm:text-3xl font-bold leading-none">{format(timeLeft.hours)}</span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400 mt-1">Hrs</span>
                    </div>
                    <span className="text-2xl font-bold self-center animate-pulse">:</span>
                    <div className="bg-white text-red-600 w-14 sm:w-16 py-2 sm:py-3 rounded-xl shadow-md flex flex-col items-center justify-center transform transition-transform hover:scale-105">
                        <span className="text-2xl sm:text-3xl font-bold leading-none">{format(timeLeft.minutes)}</span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400 mt-1">Min</span>
                    </div>
                    <span className="text-2xl font-bold self-center animate-pulse">:</span>
                    <div className="bg-white text-red-600 w-14 sm:w-16 py-2 sm:py-3 rounded-xl shadow-md flex flex-col items-center justify-center transform transition-transform hover:scale-105">
                        <span className="text-2xl sm:text-3xl font-bold leading-none">{format(timeLeft.seconds)}</span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-400 mt-1">Sec</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleTimer;
