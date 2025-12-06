import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Return Policy</h1>

            <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                    Last updated: December 3, 2025
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Return Eligibility</h2>
                    <p className="text-gray-700 mb-4">
                        We want you to be completely satisfied with your purchase. If you're not happy with your order,
                        you may return eligible items within 30 days of delivery for a full refund or exchange.
                    </p>
                    <p className="text-gray-700 mb-4">
                        To be eligible for a return, items must:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Be in original, unused condition</li>
                        <li>Include all original packaging, accessories, and documentation</li>
                        <li>Have all tags and labels attached</li>
                        <li>Not show signs of wear or damage</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Return Window</h2>
                    <p className="text-gray-700 mb-4">
                        You have 30 days from the date of delivery to initiate a return. Returns requested after this
                        period will not be accepted. The return window starts from the delivery date shown in your
                        order confirmation email.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Return an Item</h2>
                    <p className="text-gray-700 mb-4">
                        To initiate a return:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-4">
                        <li>Log in to your account and go to "Order History"</li>
                        <li>Select the order containing the item(s) you wish to return</li>
                        <li>Click "Request Return" and follow the instructions</li>
                        <li>Print the return shipping label provided</li>
                        <li>Pack the item(s) securely in the original packaging</li>
                        <li>Attach the return label and drop off at the designated shipping location</li>
                    </ol>
                    <p className="text-gray-700 mb-4">
                        Alternatively, you can contact our customer service team at returns@catchyelectronics.com
                        for assistance with your return.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Return Shipping</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Free Returns:</strong> We offer free return shipping for most items. A prepaid return
                        label will be provided when you initiate your return.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Customer Responsibility:</strong> If the return is due to customer preference (change of mind),
                        shipping costs may be deducted from your refund. If the item is defective or we made an error,
                        we will cover all shipping costs.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Processing</h2>
                    <p className="text-gray-700 mb-4">
                        Once we receive your returned item(s), we will inspect them and process your refund within
                        5-7 business days. Refunds will be issued to the original payment method used for the purchase.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Please note that it may take an additional 3-5 business days for the refund to appear in your
                        account, depending on your bank or payment provider.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Non-Returnable Items</h2>
                    <p className="text-gray-700 mb-4">
                        The following items cannot be returned:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Opened software, games, or digital products</li>
                        <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                        <li>Gift cards and promotional items</li>
                        <li>Personalized or customized products</li>
                        <li>Items damaged due to misuse or improper handling</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Exchanges</h2>
                    <p className="text-gray-700 mb-4">
                        If you would like to exchange an item for a different model, size, or color, please return
                        the original item following the return process above and place a new order for the desired item.
                        This ensures the fastest processing time.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Damaged or Defective Items</h2>
                    <p className="text-gray-700 mb-4">
                        If you receive a damaged or defective item, please contact us immediately at
                        support@catchyelectronics.com with your order number and photos of the damage. We will arrange
                        for a replacement or full refund, including return shipping costs.
                    </p>
                    <p className="text-gray-700 mb-4">
                        All electronics come with a manufacturer's warranty. For warranty claims, please refer to the
                        warranty information included with your product.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about our Return Policy, please contact us:
                    </p>
                    <ul className="list-none text-gray-700 space-y-2">
                        <li>Email: returns@catchyelectronics.com</li>
                        <li>Phone: +91 1234567890</li>
                        <li>Hours: Monday-Friday, 9:00 AM - 6:00 PM IST</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default ReturnPolicy;
