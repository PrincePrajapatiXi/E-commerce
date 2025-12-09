import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="bg-gray-50 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center space-x-2 text-xs sm:text-sm overflow-x-auto">
                    <li className="flex items-center flex-shrink-0">
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
                        >
                            <Home size={16} />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center flex-shrink-0">
                            <ChevronRight size={16} className="text-gray-400 mx-1" />
                            {index === items.length - 1 ? (
                                <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="text-gray-500 hover:text-primary transition-colors truncate max-w-[100px] sm:max-w-none"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
