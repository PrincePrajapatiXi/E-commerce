import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for detecting swipe gestures
 * @param {Object} options - Configuration options
 */
const useSwipeGesture = (options = {}) => {
    const {
        threshold = 50,
        minVelocity = 0.3,
        onSwipeLeft,
        onSwipeRight,
    } = options;

    const [swiping, setSwiping] = useState(false);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);
    const isHorizontalSwipe = useRef(false);

    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
        isHorizontalSwipe.current = false;
        setSwiping(true);
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!swiping) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - touchStartX.current;
        const diffY = currentY - touchStartY.current;

        // Determine if this is a horizontal swipe
        if (!isHorizontalSwipe.current && Math.abs(diffX) > 10) {
            isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
        }

        if (isHorizontalSwipe.current) {
            e.preventDefault();
            setSwipeOffset(diffX);
        }
    }, [swiping]);

    const handleTouchEnd = useCallback(() => {
        if (!swiping) return;

        const endTime = Date.now();
        const duration = endTime - touchStartTime.current;
        const velocity = Math.abs(swipeOffset) / duration;

        if (Math.abs(swipeOffset) >= threshold || velocity >= minVelocity) {
            if (swipeOffset > 0 && onSwipeRight) {
                onSwipeRight();
            } else if (swipeOffset < 0 && onSwipeLeft) {
                onSwipeLeft();
            }
        }

        setSwiping(false);
        setSwipeOffset(0);
    }, [swiping, swipeOffset, threshold, minVelocity, onSwipeLeft, onSwipeRight]);

    const bind = {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
    };

    return {
        bind,
        swiping,
        swipeOffset,
    };
};

export default useSwipeGesture;
