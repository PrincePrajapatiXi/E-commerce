import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This page is currently under construction. We are working hard to bring you the best experience possible.
            </p>
        </div>
    );
};

export default PlaceholderPage;
