import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const iconMap = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
};

const colorMap = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
};

const bgColorMap = {
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
};

const textColorMap = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
};

const ToastItem = ({ toast, onRemove }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const Icon = iconMap[toast.type] || Info;

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);
            setProgress(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [toast.duration]);

    const handleRemove = () => {
        setIsExiting(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`relative flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 min-w-[300px] max-w-md ${bgColorMap[toast.type]} ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
            style={{ animation: 'slideInRight 0.3s ease-out' }}
        >
            {/* Icon */}
            <div className={`flex-shrink-0 p-1 rounded-full ${colorMap[toast.type]}`}>
                <Icon size={18} className="text-white" />
            </div>

            {/* Message */}
            <p className={`flex-1 text-sm font-medium ${textColorMap[toast.type]}`}>
                {toast.message}
            </p>

            {/* Close Button */}
            <button
                onClick={handleRemove}
                className={`flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${textColorMap[toast.type]}`}
            >
                <X size={16} />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-xl overflow-hidden">
                <div
                    className={`h-full ${colorMap[toast.type]} transition-all duration-100 ease-linear`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

const Toast = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    );
};

export default Toast;
