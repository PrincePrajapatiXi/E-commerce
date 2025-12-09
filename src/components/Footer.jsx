import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield, Lock, CreditCard } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-12 sm:mt-16">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

                    {/* About Section */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                            Catchy
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                            Your trusted destination for premium electronics and cutting-edge technology.
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <Mail size={16} className="text-primary flex-shrink-0" />
                                <a href="mailto:support@catchy.com" className="hover:text-white transition-colors">
                                    support@catchy.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <Phone size={16} className="text-primary flex-shrink-0" />
                                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                                    +91 123 456 7890
                                </a>
                            </div>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <MapPin size={16} className="text-primary flex-shrink-0" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2.5 sm:space-y-3">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Shop Products
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        About Us
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Contact
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/account"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        My Account
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Policies</h3>
                        <ul className="space-y-2.5 sm:space-y-3">
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Privacy Policy
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Terms of Service
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/returns"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Return Policy
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/refund"
                                    className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm sm:text-base group"
                                >
                                    <span className="flex items-center gap-2 justify-center sm:justify-start">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                        Refund Policy
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Security & Social */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-bold mb-4">Connect With Us</h3>

                        {/* Social Media */}
                        <div className="flex justify-center sm:justify-start gap-3 mb-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>

                        {/* Security Badges */}
                        <div>
                            <p className="text-sm text-gray-400 mb-3">Secure Shopping</p>
                            <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
                                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-xs">
                                    <Lock size={14} className="text-green-400" />
                                    <span className="text-gray-300">SSL Secured</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-xs">
                                    <Shield size={14} className="text-blue-400" />
                                    <span className="text-gray-300">PCI Compliant</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg text-xs">
                                    <CreditCard size={14} className="text-purple-400" />
                                    <span className="text-gray-300">Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700/50 bg-black/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                            &copy; {currentYear} Catchy Electronics. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-xs sm:text-sm">
                            <span className="text-gray-400">Made with</span>
                            <span className="text-red-500 animate-pulse">❤️</span>
                            <span className="text-gray-400">in India</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
