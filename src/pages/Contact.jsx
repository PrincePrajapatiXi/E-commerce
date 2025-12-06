import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Get In Touch</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a question or need assistance? We're here to help!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-4 sm:space-y-6 md:space-y-8">
                        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">We'll respond within 24 hours</p>
                                    <a href="mailto:support@catchy.com" className="text-primary hover:underline text-xs sm:text-sm md:text-base">
                                        support@catchy.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Available 24/7</p>
                                    <a href="tel:+911234567890" className="text-primary hover:underline text-xs sm:text-sm md:text-base">
                                        +91 123 456 7890
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-primary" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">Visit Us</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Our office location</p>
                                    <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                                        123 Tech Street, Electronics Hub<br />
                                        New Delhi, India 110001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-br from-primary to-orange-600 p-4 sm:p-5 md:p-6 rounded-xl text-white">
                            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4">Business Hours</h3>
                            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">Send Us a Message</h2>

                            {showSuccess && (
                                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center text-xs sm:text-sm">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Message sent successfully! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                            Your Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none sm:rows-6"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-600 transition shadow-lg flex items-center justify-center disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={18} />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2" size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
