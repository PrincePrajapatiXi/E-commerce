/**
 * Utility to manage a persistent sale end time.
 * If no end time exists in localStorage, it sets one (default 24 hours).
 * This ensures all timers on the site are synced and don't reset on refresh.
 */
export const getSaleEndTime = () => {
    const STORAGE_KEY = 'catchy_sale_end_time';
    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime) {
        // Set end time to 24 hours from now
        const newEndTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
        localStorage.setItem(STORAGE_KEY, newEndTime);
        return newEndTime;
    }

    // Check if stored time has already passed
    if (new Date(endTime) < new Date()) {
        const resetEndTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
        localStorage.setItem(STORAGE_KEY, resetEndTime);
        return resetEndTime;
    }

    return endTime;
};
