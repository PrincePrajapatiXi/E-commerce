import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Refund & Cancellation Policy</h1>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Last updated: March 25, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Order Cancellation</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We understand that you may need to cancel your order. Our cancellation policy is as follows:
                        </p>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Before Shipment</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>You may cancel your order at any time before the product has been shipped.</li>
                            <li>To cancel, contact us immediately via email at <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a> with your order number.</li>
                            <li>A full refund will be processed within 5–7 business days to your original payment method.</li>
                            <li>No cancellation charges will apply for orders cancelled before shipment.</li>
                        </ul>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">After Shipment</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Once the order has been shipped, it cannot be cancelled directly.</li>
                            <li>You may refuse delivery or initiate a return after receiving the product as per our Return Policy.</li>
                            <li>If you refuse delivery, the product will be returned to us, and a refund will be initiated after we receive and inspect the item.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Cancellation by Catchy Electronics</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            We reserve the right to cancel your order under the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Product is out of stock or discontinued</li>
                            <li>Pricing or product information errors on the website</li>
                            <li>Suspected fraudulent or unauthorized transaction</li>
                            <li>Inability to verify your identity or payment information</li>
                            <li>Delivery address is unserviceable</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            In all such cases, a full refund will be issued promptly to your original payment method.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Refund Eligibility</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You are eligible for a full refund when:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>You cancel your order before it is shipped</li>
                            <li>You return an item within our 30-day return window in its original condition</li>
                            <li>You received a defective, damaged, or wrong product</li>
                            <li>Your order was not delivered within the promised timeframe</li>
                            <li>We cancelled your order for any reason mentioned above</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Refund Processing Time</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Once your refund is approved, it will be processed according to the following timeline:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li><strong>Order Cancellation (before shipment):</strong> Refund within 5–7 business days</li>
                            <li><strong>Returned Items:</strong> Inspection takes 2–3 business days; refund processed within 5–7 business days after approval</li>
                            <li><strong>Bank/Card Processing:</strong> Additional 3–5 business days for the refund to reflect in your account</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You will receive an email notification once your refund has been initiated. The total time from
                            return/cancellation to refund receipt is typically 7–15 business days.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Refund Methods</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Refunds will be issued to the original payment method used during purchase:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li><strong>Credit/Debit Cards:</strong> Refund appears within 5–10 business days</li>
                            <li><strong>UPI/Digital Wallets:</strong> Refund appears within 3–5 business days</li>
                            <li><strong>Net Banking:</strong> Refund appears within 5–7 business days</li>
                            <li><strong>Cash on Delivery:</strong> Refund via bank transfer to your provided account within 7–10 business days</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            All refunds processed through Razorpay will follow the standard processing timelines of the respective
                            payment method. For COD orders, please share your bank account details via email at{' '}
                            <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Partial Refunds</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            In certain situations, only partial refunds may be granted:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Items returned without original packaging or accessories</li>
                            <li>Items showing signs of use or wear beyond initial inspection</li>
                            <li>Items returned after 30 days but within manufacturer warranty period</li>
                            <li>Items with missing components or documentation</li>
                        </ul>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The refund amount will be adjusted based on the condition of the returned item. You will be notified
                            via email with an explanation of the partial refund amount and reason.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Shipping Cost Refunds</h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li><strong>Defective/Damaged Items:</strong> Full shipping refund including return shipping cost</li>
                            <li><strong>Our Error:</strong> Full shipping refund if we sent the wrong item</li>
                            <li><strong>Change of Mind:</strong> Original shipping costs are non-refundable; return shipping cost may be deducted from refund</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Non-Refundable Items</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            The following items are not eligible for refunds:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>Gift cards and vouchers</li>
                            <li>Downloadable software products (once accessed or activated)</li>
                            <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                            <li>Opened software, games with used activation codes</li>
                            <li>Personalized or custom-made items</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Late or Missing Refunds</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            If you haven't received your refund within the expected timeframe:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                            <li>First, check your bank account or credit card statement</li>
                            <li>Contact your bank or credit card company — processing times can vary</li>
                            <li>If you've done the above and still haven't received your refund, contact us at <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a> with your order number</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            For any questions about refunds or cancellations, please contact us:
                        </p>
                        <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
                            <li><strong>Business Name:</strong> Catchy Electronics</li>
                            <li><strong>Email:</strong> <a href="mailto:princeprajapti2589@gmail.com" className="text-primary hover:underline">princeprajapti2589@gmail.com</a></li>
                            <li><strong>Phone:</strong> +91 79058 41037</li>

                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
