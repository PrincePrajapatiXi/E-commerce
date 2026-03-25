import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Last updated: March 25, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Welcome to Catchy Electronics ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your
                            use of our website located at <strong>catchystore.vercel.app</strong> (the "Site") and your purchase of
                            products available on the Site. By accessing or using our Site, you agree to be bound by these Terms. If you
                            do not agree with any part of the Terms, you must not use our Site.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            These Terms constitute a legally binding agreement between you and Catchy Electronics. Please read them carefully
                            before placing an order or using any services offered through our platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Eligibility</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            By using this Site and making a purchase, you represent and warrant that:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>You are at least 18 years of age or accessing the Site under the supervision of a parent or legal guardian.</li>
                            <li>You have the legal capacity to enter into a binding agreement.</li>
                            <li>You are a resident of India or an eligible jurisdiction where our services are available.</li>
                            <li>All registration information you submit is truthful, accurate, and complete.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Account Registration</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            To access certain features of our Site, you may be required to create an account. When you create an account, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Provide accurate, current, and complete information during the registration process.</li>
                            <li>Maintain and promptly update your account information to keep it accurate and complete.</li>
                            <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                            <li>Notify us immediately if you become aware of any unauthorized use of your account.</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You are responsible for all activities that occur under your account. We reserve the right to suspend or
                            terminate any account at our sole discretion if we suspect unauthorized or fraudulent activity.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Products & Pricing</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We make every effort to display accurate product descriptions, images, and pricing on our Site. However:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>All product descriptions and images are for illustrative purposes and may vary slightly from the actual product.</li>
                            <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
                            <li>We reserve the right to modify prices at any time without prior notice. Price changes will not affect orders already placed and confirmed.</li>
                            <li>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Orders & Payment</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            When you place an order through our Site:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Each order placed constitutes an offer to purchase. We reserve the right to accept or reject any order at our discretion.</li>
                            <li>You will receive an order confirmation via email once your order has been successfully placed.</li>
                            <li>Payment must be completed at the time of purchase. We accept various payment methods including Credit/Debit Cards, UPI, Net Banking, and Digital Wallets.</li>
                            <li>All payments are processed securely through <strong>Razorpay</strong>, our authorized payment gateway partner. Your payment information is encrypted and handled in compliance with PCI-DSS standards.</li>
                            <li>We do not store your credit/debit card details on our servers. All payment data is handled directly by Razorpay.</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            By providing your payment information, you authorize us to charge the total order amount (including applicable taxes, shipping, and handling fees) through the selected payment method.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Order Cancellation</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You may cancel your order under the following conditions:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li><strong>Before Shipment:</strong> Orders can be cancelled free of charge before the product has been shipped. A full refund will be processed within 5–7 business days.</li>
                            <li><strong>After Shipment:</strong> Once the order has been shipped, it cannot be cancelled. You may return the product upon delivery as per our Return Policy.</li>
                            <li>We reserve the right to cancel orders due to stock unavailability, pricing errors, suspected fraud, or any other reason deemed necessary. In such cases, a full refund will be issued.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Shipping & Delivery</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We aim to deliver your orders as quickly and efficiently as possible. Please note:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Delivery timelines are estimated and may vary depending on your location and product availability.</li>
                            <li>Standard delivery takes 5–10 business days across India.</li>
                            <li>Shipping charges, if applicable, will be displayed at checkout before you confirm your order.</li>
                            <li>Risk of loss and title for products pass to you upon delivery.</li>
                            <li>We are not liable for delays caused by courier services, weather, natural disasters, or any force majeure events.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Returns & Refunds</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Our detailed Return and Refund policies are available on their respective pages. In summary:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Products may be returned within 30 days of delivery if they meet the eligibility criteria outlined in our Return Policy.</li>
                            <li>Refunds are processed within 5–7 business days after the returned item is inspected and approved.</li>
                            <li>Refunds are credited to the original payment method used during purchase.</li>
                            <li>Please refer to our <strong>Refund & Cancellation Policy</strong> and <strong>Return Policy</strong> pages for complete details.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Intellectual Property</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            All content on this Site, including but not limited to text, graphics, logos, images, product descriptions,
                            software, and design, is the property of Catchy Electronics and is protected under applicable intellectual
                            property laws of India.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>You may not reproduce, distribute, modify, or create derivative works from any content on our Site without our prior written consent.</li>
                            <li>The "Catchy" name, logo, and all related marks are trademarks of Catchy Electronics.</li>
                            <li>Unauthorized use of our intellectual property may result in legal action.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. User Conduct</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            While using our Site, you agree not to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Use the Site for any unlawful or fraudulent purpose.</li>
                            <li>Interfere with or disrupt the operation of the Site or its servers.</li>
                            <li>Attempt to gain unauthorized access to any part of the Site.</li>
                            <li>Use automated scripts or tools to extract data from the Site (scraping).</li>
                            <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
                            <li>Upload or transmit viruses, malware, or any other harmful code.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Limitation of Liability</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            To the fullest extent permitted by applicable law:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Catchy Electronics shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or purchase of products.</li>
                            <li>Our total liability for any claim shall not exceed the amount paid by you for the specific product giving rise to the claim.</li>
                            <li>We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Indemnification</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You agree to indemnify, defend, and hold harmless Catchy Electronics, its officers, directors, employees,
                            agents, and affiliates from and against all claims, liabilities, damages, losses, and expenses (including
                            reasonable attorney's fees) arising from your use of the Site, your violation of these Terms, or your
                            violation of any rights of another party.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Privacy</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Your use of the Site is also governed by our Privacy Policy. Please review our Privacy Policy, which
                            explains how we collect, use, and protect your personal information. By using our Site, you consent to
                            the collection and use of information as described in our Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Third-Party Links</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Our Site may contain links to third-party websites or services that are not owned or controlled by
                            Catchy Electronics. We have no control over, and assume no responsibility for, the content, privacy
                            policies, or practices of any third-party websites. You acknowledge and agree that Catchy Electronics
                            shall not be responsible or liable for any damage or loss caused by the use of any such third-party content or services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">15. Governing Law & Jurisdiction</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising
                            out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts
                            located in Uttar Pradesh, Orai, India.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">16. Changes to Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We reserve the right to update or modify these Terms at any time without prior notice. Changes will be
                            effective immediately upon posting on our Site. Your continued use of the Site after any changes constitutes
                            your acceptance of the revised Terms. We encourage you to review these Terms periodically.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">17. Severability</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent
                            jurisdiction, the remaining provisions shall continue in full force and effect.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">18. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you have any questions, concerns, or complaints regarding these Terms and Conditions, please contact us:
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

export default TermsAndConditions;
