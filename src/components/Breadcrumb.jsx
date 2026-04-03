import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap gap-1" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={14} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    {item.link ? (
                        <Link to={item.link} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
