import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 sm:py-8 md:py-12 mt-8 sm:mt-10 md:mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
                    {/* Policies */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Policies</h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition text-xs sm:text-sm md:text-base">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition text-xs sm:text-sm md:text-base">Terms of Service</Link></li>
                            <li><Link to="/returns" className="text-gray-400 hover:text-white transition text-xs sm:text-sm md:text-base">Return Policy</Link></li>
                            <li><Link to="/refund" className="text-gray-400 hover:text-white transition text-xs sm:text-sm md:text-base">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Security */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Security</h3>
                        <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                            <img src="/images/ssl-badge.png" alt="SSL Secured" loading="lazy" className="h-8 sm:h-10" />
                            <img src="/images/pci-badge.png" alt="PCI Compliant" loading="lazy" className="h-8 sm:h-10" />
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4 sm:space-x-6">
                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl sm:text-2xl transition">
                                <i className="fab fa-discord"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl sm:text-2xl transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
                    <p>&copy; 2025 Catchy Electronics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
