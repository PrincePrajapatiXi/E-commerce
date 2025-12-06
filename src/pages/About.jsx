import React from 'react';
import { ShoppingBag, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-orange-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">About Catchy Electronics</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto opacity-90">
                        Your trusted destination for premium electronics and cutting-edge technology
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">Our Story</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                            Founded with a passion for technology and innovation, Catchy Electronics has been serving customers with the latest and greatest in electronic products since our inception.
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                            We believe that everyone deserves access to quality electronics at fair prices. Our mission is to bridge the gap between cutting-edge technology and everyday consumers.
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                            From smartphones to laptops, gaming accessories to smart home devices, we curate only the best products to ensure customer satisfaction.
                        </p>
                    </div>
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
                        <img
                            src="/images/Full Set up.png"
                            alt="Our Setup"
                            loading="lazy"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
                        <div className="p-3 sm:p-4 md:p-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                                <Users className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">10K+</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600">Happy Customers</p>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                                <ShoppingBag className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">500+</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600">Products</p>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                                <Award className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">100%</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600">Quality Assured</p>
                        </div>
                        <div className="p-3 sm:p-4 md:p-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                                <TrendingUp className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600">Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Quality First</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            We never compromise on quality. Every product is carefully selected and tested to meet our high standards.
                        </p>
                    </div>
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Fair Pricing</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Transparent pricing with no hidden costs. We believe in providing value for money to all our customers.
                        </p>
                    </div>
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Customer Satisfaction</h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Your satisfaction is our priority. We're here to help with excellent customer service and support.
                        </p>
                    </div>
                </div>
            </div>

            {/* Meet Our Team */}
            <div className="bg-white py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-primary to-orange-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                                P
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">Prince</h3>
                            <p className="text-primary font-medium mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Founder</p>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Tech enthusiast with a vision to make premium electronics accessible to everyone.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">

                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">Utsav</h3>
                            <p className="text-primary font-medium mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Head of Operations</p>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Ensuring smooth operations and timely delivery of products to our valued customers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
