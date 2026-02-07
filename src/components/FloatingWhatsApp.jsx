import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const phoneNumber = '919876543210'; // Replace with actual number
    const defaultMessage = 'Hi! I have a question about your products.';

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = encodeURIComponent(message || defaultMessage);
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold">Catchy Support</h3>
                            <p className="text-green-100 text-sm">Usually replies within 1 hour</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[120px]">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%]">
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                👋 Hi there! How can we help you today?
                            </p>
                            <span className="text-xs text-gray-400 mt-1 block">Just now</span>
                        </div>
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${isOpen
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-green-500 hover:bg-green-600 animate-bounce'
                    }`}
                style={{ animationDuration: '2s' }}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                )}
            </button>

            {/* Tooltip */}
            {!isOpen && (
                <div className="fixed bottom-8 right-24 z-50 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm text-gray-700 dark:text-gray-300 animate-pulse">
                    Need help? Chat with us!
                </div>
            )}
        </>
    );
};

export default FloatingWhatsApp;
