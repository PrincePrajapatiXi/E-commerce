import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-card flex flex-col h-full animate-pulse">
            {/* Image Skeleton */}
            <div className="mb-3 sm:mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 h-32 sm:h-40 lg:h-48 animate-shimmer" />

            {/* Title Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-3" />

            {/* Rating Skeleton */}
            <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
                ))}
            </div>

            {/* Description Skeleton (hidden on mobile) */}
            <div className="hidden sm:block space-y-2 mb-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6" />
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Price and Button Skeleton */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                </div>
                <div className="h-10 sm:h-11 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
            </div>
        </div>
    );
};

export default SkeletonCard;
