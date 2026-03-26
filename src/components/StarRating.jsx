import React from 'react';

const StarRating = ({ rating, size = 18, showText = true, reviewsCount = null }) => {
    // Ensure rating is between 0 and 5
    const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(normalizedRating);
    const partialFill = (normalizedRating - fullStars) * 100;
    
    return (
        <div className="flex items-center gap-2 py-1">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                    const starId = `star-grad-${i}-${Math.random().toString(36).substr(2, 9)}`;
                    let fillPercent = 0;
                    if (i < fullStars) {
                        fillPercent = 100;
                    } else if (i === fullStars) {
                        fillPercent = partialFill;
                    }

                    return (
                        <div key={i} className="relative leading-none flex items-center justify-center">
                            <svg
                                width={size}
                                height={size}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transform hover:scale-110 transition-transform"
                            >
                                <defs>
                                    <linearGradient id={starId}>
                                        <stop offset={`${fillPercent}%`} stopColor="#FFA41C" />
                                        <stop offset={`${fillPercent}%`} stopColor="#D1D5DB" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                    fill={`url(#${starId})`}
                                    stroke="#FFA41C"
                                    strokeWidth="0.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    );
                })}
            </div>
            {showText && (
                <span className="text-sm text-[#007185] dark:text-primary-light hover:text-[#C7511F] hover:underline cursor-pointer transition-colors">
                    {reviewsCount ? `${reviewsCount} reviews` : `(${normalizedRating}/5 ratings)`}
                </span>
            )}
        </div>
    );
};

export default StarRating;
