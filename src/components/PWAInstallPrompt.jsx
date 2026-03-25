import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');

        if (isStandalone || dismissed) return;

        // Check for iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        // For iOS, show our custom prompt after delay
        if (isIOSDevice) {
            setTimeout(() => setShowPrompt(true), 3000);
            return;
        }

        // For other browsers, capture the install prompt event
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setTimeout(() => setShowPrompt(true), 2000);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            // iOS doesn't support programmatic install, just show instructions
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowPrompt(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-prompt-dismissed', 'true');
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 md:hidden z-40 animate-slideUp">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 relative">
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                    <X size={18} className="text-gray-400" />
                </button>

                <div className="flex items-start gap-4">
                    {/* App Icon */}
                    <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Smartphone size={28} className="text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">
                            Install Catchy App
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {isIOS
                                ? 'Tap Share → "Add to Home Screen"'
                                : 'Add to your home screen for quick access'}
                        </p>

                        {!isIOS && (
                            <button
                                onClick={handleInstall}
                                className="mt-3 flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                <Download size={16} />
                                Install Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
