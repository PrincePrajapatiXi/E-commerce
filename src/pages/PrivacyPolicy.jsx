import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Last updated: March 25, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Catchy Electronics ("we", "our", "us") is committed to protecting the privacy of our users.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your personal
                            information when you visit our website and make purchases. Please read this Privacy Policy
                            carefully. By using our Site, you consent to the practices described in this policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Name, email address, and contact information</li>
                            <li>Billing and shipping addresses</li>
                            <li>Payment information (processed securely through Razorpay — we do not store your card details)</li>
                            <li>Order history, transaction details, and product preferences</li>
                            <li>Account credentials (email and encrypted password)</li>
                            <li>Device information, IP address, browser type, and operating system</li>
                            <li>Usage data such as pages visited, time spent, and click patterns</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Process and fulfill your orders and transactions</li>
                            <li>Communicate with you about your orders, account, and our services</li>
                            <li>Process payments securely through our payment gateway partner (Razorpay)</li>
                            <li>Send you promotional materials and newsletters (with your explicit consent)</li>
                            <li>Improve our website, products, and customer service experience</li>
                            <li>Detect, prevent, and address fraud and security issues</li>
                            <li>Comply with legal obligations and enforce our Terms & Conditions</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Payment Information & Razorpay</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            All payment transactions on our website are processed through <strong>Razorpay</strong>, a PCI-DSS
                            compliant payment gateway. When you make a purchase:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Your payment information (credit/debit card numbers, UPI IDs, etc.) is collected and processed directly by Razorpay.</li>
                            <li>We do not store, process, or have access to your complete payment card details on our servers.</li>
                            <li>Razorpay uses industry-standard encryption and security measures to protect your payment data.</li>
                            <li>For more information, please review <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Razorpay's Privacy Policy</a>.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
                            Cookies help us understand your preferences and improve your browsing experience. You can instruct your browser
                            to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Site may not
                            function properly without cookies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Information Sharing and Disclosure</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Service providers who assist us in operating our website and conducting our business</li>
                            <li>Payment processors (Razorpay) to complete transactions securely</li>
                            <li>Shipping and logistics partners to deliver your orders</li>
                            <li>Analytics providers to help us understand website usage patterns</li>
                            <li>Law enforcement or regulatory agencies when required by law or to protect our rights</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data Security</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We implement appropriate technical and organizational security measures to protect your personal information
                            from unauthorized access, alteration, disclosure, or destruction. These measures include SSL encryption,
                            secure server infrastructure, and regular security audits. However, no method of transmission over the
                            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Data Retention</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We retain your personal information for as long as your account is active or as needed to provide you
                            services, comply with our legal obligations, resolve disputes, and enforce our agreements. You may request
                            deletion of your account and associated data by contacting us at the email provided below.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Your Rights</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request corrections to your personal information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications at any time</li>
                            <li>Object to processing of your personal information</li>
                            <li>Withdraw consent where processing is based on your consent</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            To exercise any of these rights, please contact us at <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Children's Privacy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Our website is not intended for children under 18 years of age. We do not knowingly collect personal
                            information from children under 18. If you are a parent or guardian and believe your child has provided
                            us with personal information, please contact us immediately, and we will take steps to delete such information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the
                            new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Site after
                            changes are posted constitutes your acceptance of the revised policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
                            <li><strong>Business Name:</strong> Catchy Electronics</li>
                            <li><strong>Email:</strong> <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a></li>
                            <li><strong>Phone:</strong> +91 79058 41037</li>
                            <li><strong>Address:</strong> Uttar Pradesh, Orai, India</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
