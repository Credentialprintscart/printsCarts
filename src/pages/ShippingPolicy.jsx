'use client';
import React from 'react';
import '../styles/PolicyPages.css';

const ShippingPolicy = () => {
    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Shipping Policy – Prints Carts</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Thank you for shopping with Prints Carts. This Shipping Policy outlines how we process, ship, and deliver orders across the United States and Canada. Our goal is to provide clear information so you know what to expect when placing an order.
                    </div>

                    <section>
                        <h2>1. Shipping Locations</h2>
                        <p>Prints Carts currently ships to:</p>
                        <ul>
                            <li>All U.S. states (continental & non-continental)</li>
                            <li>Canada (excluding remote or restricted regions)</li>
                        </ul>
                        <p>We do not ship internationally outside the United States and Canada at this time.</p>
                    </section>

                    <section>
                        <h2>2. Processing Time</h2>
                        <p>Order Processing:</p>
                        <ul>
                            <li>Orders are typically processed within 1–2 business days.</li>
                        </ul>
                        <p>Processing time includes:</p>
                        <ul>
                            <li>Order verification</li>
                            <li>Packaging</li>
                            <li>Quality checks</li>
                            <li>Preparation for carrier pickup</li>
                        </ul>
                        <p>Orders placed on weekends or holidays will be processed on the next business day. Processing times may vary during peak seasons or due to product availability.</p>
                    </section>

                    <section>
                        <h2>3. Delivery Timeframes</h2>
                        <p>Delivery times depend on:</p>
                        <ul>
                            <li>Shipping destination</li>
                            <li>Product availability</li>
                            <li>Carrier operations</li>
                            <li>Weather or transit delays</li>
                        </ul>
                        <h3>Estimated Delivery Windows (U.S.)</h3>
                        <ul>
                            <li>Standard Shipping: 3–7 business days</li>
                            <li>Expedited Shipping (when offered): 2–4 business days</li>
                        </ul>
                        <h3>Estimated Delivery Windows (Canada)</h3>
                        <ul>
                            <li>Standard Shipping: 5–10 business days</li>
                            <li>Expedited Shipping (when offered): 3–7 business days</li>
                        </ul>
                        <p>Delivery estimates are not guaranteed and may vary.</p>
                    </section>

                    <section>
                        <h2>4. Shipping Costs</h2>
                        <p>Shipping fees are calculated at checkout and depend on:</p>
                        <ul>
                            <li>Weight of items</li>
                            <li>Shipping location</li>
                            <li>Carrier rates</li>
                            <li>Selected shipping method</li>
                        </ul>
                        <p>Free shipping may be available during promotions; eligibility will be clearly displayed when applicable.</p>
                    </section>

                    <section>
                        <h2>5. Shipping Carriers</h2>
                        <p>We work with reputable carriers, including:</p>
                        <ul>
                            <li>USPS</li>
                            <li>UPS</li>
                            <li>FedEx</li>
                            <li>Canada Post (for Canadian orders)</li>
                        </ul>
                        <p>Carrier availability may vary by region.</p>
                    </section>

                    <section>
                        <h2>6. Order Tracking</h2>
                        <p>Once your order ships, you will receive an email containing:</p>
                        <ul>
                            <li>Tracking number</li>
                            <li>Carrier name</li>
                            <li>Link to track your package</li>
                        </ul>
                        <p>Tracking updates may take up to 24 hours to appear after carrier pickup.</p>
                    </section>

                    <section>
                        <h2>7. Incorrect or Incomplete Addresses</h2>
                        <p>Please ensure the accuracy of your shipping address before completing checkout.</p>
                        <p>Prints Carts is not responsible for:</p>
                        <ul>
                            <li>Delays caused by incorrect addresses</li>
                            <li>Packages delivered to the wrong location</li>
                            <li>Returned shipments due to incomplete address information</li>
                        </ul>
                        <p>If a package is returned to us due to an incorrect address, reshipping fees may apply.</p>
                    </section>

                    <section>
                        <h2>8. Delivery Attempts & Lost Packages</h2>
                        <h3>Missed Delivery Attempts:</h3>
                        <p>If the carrier is unable to deliver your package:</p>
                        <ul>
                            <li>They may attempt a second delivery</li>
                            <li>They may leave a pickup notice</li>
                            <li>They may hold the package at a local facility</li>
                        </ul>
                        <h3>Lost or Stolen Packages:</h3>
                        <p>If your tracking number shows “delivered” but you did not receive the package:</p>
                        <ul>
                            <li>Check with neighbors or building management</li>
                            <li>Wait 24–48 hours (sometimes packages are scanned early)</li>
                            <li>Contact the carrier directly</li>
                        </ul>
                        <p>If you still cannot locate your package, contact us and we will assist you in coordinating with the carrier. Prints Carts cannot guarantee replacement for lost or stolen packages but will help investigate the issue.</p>
                    </section>

                    <section>
                        <h2>9. Out-of-Stock or Partial Shipments</h2>
                        <p>If an item becomes unavailable after your order is placed:</p>
                        <ul>
                            <li>We will notify you by email</li>
                            <li>You may choose a refund or wait for restocking (when applicable)</li>
                        </ul>
                        <p>In some cases, items in your order may ship separately at no extra cost.</p>
                    </section>

                    <section>
                        <h2>10. Damaged Shipments</h2>
                        <p>If your order arrives damaged:</p>
                        <ul>
                            <li>Contact us within 48 hours</li>
                            <li>Include photos of the product and packaging</li>
                            <li>Provide your order number</li>
                        </ul>
                        <p>We will review the case and provide the appropriate next steps.</p>
                    </section>

                    <section>
                        <h2>11. Customs & Duties (Canada Only)</h2>
                        <p>Canadian orders may be subject to:</p>
                        <ul>
                            <li>Import fees</li>
                            <li>Customs duties</li>
                            <li>Taxes</li>
                        </ul>
                        <p>These charges are the responsibility of the customer and are not included in product or shipping costs.</p>
                    </section>

                    <section>
                        <h2>12. Delivery Restrictions</h2>
                        <p>We cannot ship to:</p>
                        <ul>
                            <li>P.O. boxes in some regions</li>
                            <li>APO/FPO addresses (depending on product type)</li>
                            <li>Certain remote or restricted locations in Canada</li>
                            <li>Addresses flagged as potentially unsafe or unserviceable by carriers</li>
                        </ul>
                    </section>

                    <section>
                        <h2>13. Questions About Shipping?</h2>
                        <p>If you have questions about your order or need assistance with shipping:</p>
                        <p>
                            📧 Email: support@printscarts.com<br />
                            🌐 Website: www.printscarts.com
                        </p>
                        <p>We aim to respond promptly during standard business hours.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-SP-2026-V1</span>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ background: 'none', border: 'none', color: '#0f3d91', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Back to Top ↑
                    </button>
                </div>
            </main>
            
        </div>
    );
};

export default ShippingPolicy;



