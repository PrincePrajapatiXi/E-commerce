import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';

const ProductSection = ({ title, products, viewAllLink, icon, gradient = "from-primary to-secondary" }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                    {icon && <div className={`text-2xl sm:text-3xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{icon}</div>}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        {title}
                    </h2>
                </div>
                {viewAllLink && (
                    <Link
                        to={viewAllLink}
                        className="flex items-center gap-1 text-sm sm:text-base text-primary hover:text-secondary font-semibold transition-all group min-h-[44px] px-3 py-2 rounded-lg hover:bg-primary/5"
                    >
                        <span>View All</span>
                        <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            {/* Product Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 min-w-max sm:min-w-0">
                    {products.slice(0, 4).map(product => (
                        <div key={product.id} className="w-[280px] sm:w-auto flex-shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
