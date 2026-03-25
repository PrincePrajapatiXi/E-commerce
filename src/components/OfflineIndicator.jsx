import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineIndicator = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showBanner, setShowBanner] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                setShowBanner(true);
                // Auto-hide after 3 seconds
                setTimeout(() => setShowBanner(false), 3000);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
            setShowBanner(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [wasOffline]);

    if (!showBanner) return null;

    return (
        <div
            className={`fixed top-16 left-0 right-0 z-50 animate-slideDown ${isOnline ? 'bg-green-500' : 'bg-gray-800'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center justify-center gap-2 text-white text-sm font-medium">
                    {isOnline ? (
                        <>
                            <Wifi size={16} />
                            <span>Back online</span>
                        </>
                    ) : (
                        <>
                            <WifiOff size={16} />
                            <span>You're offline. Some features may be limited.</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfflineIndicator;
