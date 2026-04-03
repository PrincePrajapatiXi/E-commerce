import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        // Log error to console in dev
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, errorInfo);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
                    <div className="text-center max-w-md animate-fadeIn">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={36} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Something went wrong
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                            We're sorry, but something unexpected happened. Please try again or go back to the home page.
                        </p>

                        {/* Dev mode error details */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mb-6 text-left">
                                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 mb-2">
                                    Error Details (Dev Only)
                                </summary>
                                <pre className="text-xs bg-gray-900 text-red-400 p-4 rounded-lg overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold shadow-button hover:shadow-glow transition-all transform hover:-translate-y-0.5"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-primary px-6 py-3 rounded-full font-semibold transition-all"
                            >
                                <Home size={16} />
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
