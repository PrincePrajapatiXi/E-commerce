import { useCallback } from 'react';

/**
 * Custom hook for haptic feedback using the Vibration API
 */
const useHaptic = () => {
    const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

    const vibrate = useCallback((pattern = 10) => {
        if (isSupported) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                // Silently fail if vibration not allowed
            }
        }
    }, [isSupported]);

    // Light tap feedback
    const light = useCallback(() => {
        vibrate(10);
    }, [vibrate]);

    // Medium feedback
    const medium = useCallback(() => {
        vibrate(25);
    }, [vibrate]);

    // Heavy feedback
    const heavy = useCallback(() => {
        vibrate(50);
    }, [vibrate]);

    // Success pattern
    const success = useCallback(() => {
        vibrate([10, 50, 20]);
    }, [vibrate]);

    // Error pattern
    const error = useCallback(() => {
        vibrate([50, 50, 50]);
    }, [vibrate]);

    // Selection feedback
    const selection = useCallback(() => {
        vibrate(5);
    }, [vibrate]);

    return {
        isSupported,
        vibrate,
        light,
        medium,
        heavy,
        success,
        error,
        selection,
    };
};

export default useHaptic;
