import React, { useState, useRef } from 'react';

const ImageZoom = ({ src, alt, className = '' }) => {
    const [isZooming, setIsZooming] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsZooming(true);
    const handleMouseLeave = () => {
        setIsZooming(false);
        setPosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden cursor-zoom-in ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain transition-transform duration-300 ${isZooming ? 'scale-150' : 'scale-100'
                    }`}
                style={{
                    transformOrigin: `${position.x}% ${position.y}%`
                }}
                draggable={false}
            />

            {/* Zoom Indicator */}
            {!isZooming && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Hover to zoom
                </div>
            )}
        </div>
    );
};

export default ImageZoom;
