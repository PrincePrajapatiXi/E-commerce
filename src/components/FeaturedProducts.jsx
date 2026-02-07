import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const FeaturedProducts = ({ products, title = "Featured Products" }) => {
    // Take first 3 products for featured display
    const featured = products.slice(0, 3);

    if (featured.length === 0) return null;

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Hand-picked products just for you
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Featured Grid - Big + 2 Small */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Featured Product */}
                    <Link
                        to={`/product/${featured[0].id}`}
                        className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
                    >
                        <div className="aspect-square p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                            <img
                                src={featured[0].images[0]}
                                alt={featured[0].name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < featured[0].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
                                {featured[0].name}
                            </h3>
                            <p className="text-2xl font-bold text-primary">
                                ₹{featured[0].price.toLocaleString()}
                            </p>
                        </div>
                        {/* Badge */}
                        <div className="absolute top-4 left-4 bg-gradient-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                            Featured
                        </div>
                    </Link>

                    {/* Two Smaller Products */}
                    <div className="grid grid-rows-2 gap-6">
                        {featured.slice(1, 3).map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group flex bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                            >
                                <div className="w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4 flex items-center justify-center">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                            />
                                        ))}
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                            ({product.rating})
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-primary">
                                        ₹{product.price.toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className="mt-8 sm:hidden text-center">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-glow transition-all"
                    >
                        View All Products
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
