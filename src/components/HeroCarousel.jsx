import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: 'Premium Electronics',
        subtitle: 'Discover the Future',
        description: 'Explore our collection of cutting-edge tech gadgets',
        cta: 'Shop Now',
        link: '/products',
        bgGradient: 'from-purple-600 via-blue-600 to-cyan-500',
        image: '/images/Full Set up.png'
    },
    {
        id: 2,
        title: 'Gaming Paradise',
        subtitle: 'Level Up Your Game',
        description: 'High-performance gaming gear for champions',
        cta: 'Explore Gaming',
        link: '/products',
        bgGradient: 'from-red-600 via-orange-500 to-yellow-500',
        image: '/images/gaming-setup.png'
    },
    {
        id: 3,
        title: 'Work From Anywhere',
        subtitle: 'Productivity Essentials',
        description: 'Professional laptops and accessories',
        cta: 'View Laptops',
        link: '/products',
        bgGradient: 'from-slate-700 via-gray-600 to-zinc-500',
        image: '/images/laptop-setup.png'
    }
];

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef(null);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            goToNext();
        }, 5000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            startTimer();
        }
        return () => stopTimer();
    }, [isPlaying, currentSlide]);

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        stopTimer();
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToPrev = () => {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };

    const goToNext = () => {
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const slide = slides[currentSlide];

    return (
        <div className={`relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 overflow-hidden`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                    {/* Text Content */}
                    <div className={`text-white text-center lg:text-left transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                            {slide.subtitle}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            {slide.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
                            {slide.description}
                        </p>
                        <Link
                            to={slide.link}
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                        >
                            {slide.cta}
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className={`hidden lg:block transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl"
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                {/* Dots */}
                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/50 hover:bg-white/70'
                                }`}
                        />
                    ))}
                </div>

                {/* Play/Pause */}
                <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                    {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                    ) : (
                        <Play className="w-4 h-4 text-white" />
                    )}
                </button>
            </div>

            {/* Arrow Navigation */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm hidden sm:block"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm hidden sm:block"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </div>
    );
};

export default HeroCarousel;
