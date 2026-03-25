import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for edge swipe navigation (swipe from left edge to go back)
 */
const useGestureNavigation = (options = {}) => {
    const {
        edgeWidth = 30,
        threshold = 100,
        enabled = true,
    } = options;

    const navigate = useNavigate();
    const startX = useRef(0);
    const startY = useRef(0);
    const isEdgeSwipe = useRef(false);

    const handleTouchStart = useCallback((e) => {
        if (!enabled) return;

        const touch = e.touches[0];
        startX.current = touch.clientX;
        startY.current = touch.clientY;

        // Check if touch started from left edge
        isEdgeSwipe.current = touch.clientX <= edgeWidth;
    }, [enabled, edgeWidth]);

    const handleTouchEnd = useCallback((e) => {
        if (!enabled || !isEdgeSwipe.current) return;

        const touch = e.changedTouches[0];
        const diffX = touch.clientX - startX.current;
        const diffY = Math.abs(touch.clientY - startY.current);

        // Check if it's a horizontal swipe from edge
        if (diffX > threshold && diffY < 100) {
            navigate(-1);
        }

        isEdgeSwipe.current = false;
    }, [enabled, threshold, navigate]);

    useEffect(() => {
        if (!enabled) return;

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [enabled, handleTouchStart, handleTouchEnd]);
};

export default useGestureNavigation;
