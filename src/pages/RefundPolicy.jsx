import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

            <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: December 3, 2025
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Refund Eligibility</h2>
                    <p className="text-gray-700 mb-4">
                        You are eligible for a full refund when:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>You return an item within our 30-day return window</li>
                        <li>The item is in its original condition with all packaging and accessories</li>
                        <li>You received a defective or damaged product</li>
                        <li>We made an error with your order (wrong item, incorrect quantity, etc.)</li>
                        <li>Your order was not delivered within the promised timeframe</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Refund Processing Time</h2>
                    <p className="text-gray-700 mb-4">
                        Once we receive and inspect your returned item, we will process your refund according to
                        the following timeline:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li><strong>Inspection:</strong> 2-3 business days after we receive your return</li>
                        <li><strong>Refund Processing:</strong> 5-7 business days after inspection approval</li>
                        <li><strong>Bank Processing:</strong> 3-5 business days for the refund to appear in your account</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        You will receive an email confirmation once your refund has been processed. The total time
                        from return shipment to refund receipt is typically 10-15 business days.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Methods</h2>
                    <p className="text-gray-700 mb-4">
                        Refunds will be issued using the same payment method you used for your original purchase:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li><strong>Credit/Debit Cards:</strong> Refunds appear within 5-10 business days</li>
                        <li><strong>Net Banking:</strong> Refunds appear within 5-7 business days</li>
                        <li><strong>UPI/Digital Wallets:</strong> Refunds appear within 3-5 business days</li>
                        <li><strong>Cash on Delivery:</strong> Bank transfer to your provided account (7-10 business days)</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        If you paid using Cash on Delivery, please provide your bank account details via email at
                        refunds@catchyelectronics.com to receive your refund.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Partial Refunds</h2>
                    <p className="text-gray-700 mb-4">
                        In certain situations, only partial refunds may be granted:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Items returned without original packaging or accessories</li>
                        <li>Items showing signs of use or wear beyond initial inspection</li>
                        <li>Items returned after 30 days but within manufacturer warranty period</li>
                        <li>Items with missing components or documentation</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        The refund amount will be adjusted based on the condition of the returned item. We will
                        notify you via email if a partial refund is granted, explaining the reason and adjusted amount.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Shipping Cost Refunds</h2>
                    <p className="text-gray-700 mb-4">
                        Shipping costs are refunded under the following conditions:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li><strong>Defective/Damaged Items:</strong> Full shipping refund including return shipping</li>
                        <li><strong>Our Error:</strong> Full shipping refund if we sent the wrong item</li>
                        <li><strong>Change of Mind:</strong> Original shipping costs are non-refundable; return shipping may be deducted</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cancelled Orders</h2>
                    <p className="text-gray-700 mb-4">
                        If you cancel your order before it ships:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Full refund will be processed within 5-7 business days</li>
                        <li>No cancellation fees will be charged</li>
                        <li>Refund will be issued to your original payment method</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        If your order has already shipped, you will need to follow the standard return process
                        to receive a refund.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Non-Refundable Items</h2>
                    <p className="text-gray-700 mb-4">
                        The following items are not eligible for refunds:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Gift cards</li>
                        <li>Downloadable software products (once accessed)</li>
                        <li>Items marked as "Final Sale"</li>
                        <li>Opened software, games with activation codes</li>
                        <li>Personalized or custom-made items</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Checking Refund Status</h2>
                    <p className="text-gray-700 mb-4">
                        You can check the status of your refund by:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Logging into your account and viewing your order history</li>
                        <li>Checking your email for refund confirmation</li>
                        <li>Contacting our customer service team with your order number</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        If you haven't received your refund within the expected timeframe, please contact your bank
                        or payment provider first, as processing times may vary. If you've done this and still haven't
                        received your refund, please contact us.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Late or Missing Refunds</h2>
                    <p className="text-gray-700 mb-4">
                        If you haven't received a refund yet, first check:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Your bank account or credit card statement</li>
                        <li>Contact your credit card company (it may take time before refund is posted)</li>
                        <li>Contact your bank (there's often processing time before a refund is posted)</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        If you've done all of this and still have not received your refund, please contact us at
                        refunds@catchyelectronics.com with your order number.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        For any questions about refunds, please contact us:
                    </p>
                    <ul className="list-none text-gray-700 space-y-2">
                        <li>Email: refunds@catchyelectronics.com</li>
                        <li>Phone: +91 1234567890</li>
                        <li>Hours: Monday-Friday, 9:00 AM - 6:00 PM IST</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default RefundPolicy;
