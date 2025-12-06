import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: December 3, 2025
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Name, email address, and contact information</li>
                        <li>Billing and shipping addresses</li>
                        <li>Payment information (processed securely through our payment partners)</li>
                        <li>Order history and preferences</li>
                        <li>Account credentials</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                    <p className="text-gray-700 mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your orders and our services</li>
                        <li>Send you promotional materials (with your consent)</li>
                        <li>Improve our website and customer service</li>
                        <li>Detect and prevent fraud</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
                    <p className="text-gray-700 mb-4">
                        We use cookies and similar tracking technologies to track activity on our website and hold certain information.
                        Cookies help us understand your preferences and improve your browsing experience. You can instruct your browser
                        to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                    <p className="text-gray-700 mb-4">
                        We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Service providers who assist us in operating our website and conducting our business</li>
                        <li>Payment processors to complete transactions</li>
                        <li>Shipping companies to deliver your orders</li>
                        <li>Law enforcement or regulatory agencies when required by law</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                    <p className="text-gray-700 mb-4">
                        We implement appropriate security measures to protect your personal information from unauthorized access,
                        alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
                        storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                    <p className="text-gray-700 mb-4">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Access the personal information we hold about you</li>
                        <li>Request corrections to your personal information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Object to processing of your personal information</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
                    <p className="text-gray-700 mb-4">
                        Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                        information from children under 13. If you are a parent or guardian and believe your child has provided
                        us with personal information, please contact us.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
                    <p className="text-gray-700 mb-4">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                        new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <ul className="list-none text-gray-700 space-y-2">
                        <li>Email: privacy@catchyelectronics.com</li>
                        <li>Phone: +91 1234567890</li>
                        <li>Address: Catchy Electronics, India</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
