import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <Link to={`/product/${product.id}`} className="block mb-2 sm:mb-4 overflow-hidden rounded-md">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-24 sm:h-40 lg:h-48 object-contain hover:scale-105 transition-transform duration-300"
                />
            </Link>
            <div className="flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h4 className="text-xs sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h4>
                </Link>
                <div className="flex items-center mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={`sm:w-4 sm:h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                    ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{product.description}</p>
            </div>
            <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100">
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-primary">₹ {product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductCard;
