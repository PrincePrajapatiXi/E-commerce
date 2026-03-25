import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for pull-to-refresh functionality
 * @param {Function} onRefresh - Callback function to execute on refresh
 * @param {Object} options - Configuration options
 */
const usePullToRefresh = (onRefresh, options = {}) => {
    const {
        threshold = 80,
        maxPull = 120,
        resistance = 2.5,
    } = options;

    const [isPulling, setIsPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [startY, setStartY] = useState(0);

    const handleTouchStart = useCallback((e) => {
        // Only enable pull-to-refresh when at top of page
        if (window.scrollY === 0) {
            setStartY(e.touches[0].clientY);
            setIsPulling(true);
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isPulling || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        // Only allow pulling down
        if (diff > 0 && window.scrollY === 0) {
            // Apply resistance
            const distance = Math.min(diff / resistance, maxPull);
            setPullDistance(distance);

            // Prevent default scroll when pulling
            if (distance > 10) {
                e.preventDefault();
            }
        }
    }, [isPulling, isRefreshing, startY, resistance, maxPull]);

    const handleTouchEnd = useCallback(async () => {
        if (!isPulling) return;

        if (pullDistance >= threshold && !isRefreshing) {
            setIsRefreshing(true);
            try {
                await onRefresh();
            } finally {
                setIsRefreshing(false);
            }
        }

        setIsPulling(false);
        setPullDistance(0);
    }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

    useEffect(() => {
        const options = { passive: false };
        document.addEventListener('touchstart', handleTouchStart, options);
        document.addEventListener('touchmove', handleTouchMove, options);
        document.addEventListener('touchend', handleTouchEnd, options);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    return {
        pullDistance,
        isRefreshing,
        isPulling,
        progress: Math.min(pullDistance / threshold, 1),
    };
};

export default usePullToRefresh;
