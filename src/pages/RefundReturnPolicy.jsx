'use client';
import React from 'react';
import { FiMail, FiMessageSquare } from 'react-icons/fi';
import '../styles/PolicyPages.css';

const RefundReturnPolicy = () => {
    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Refund & Return Policy – Prints Carts</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Your satisfaction is important to us. Prints Carts provides a clear and customer-focused return and refund policy to help you shop confidently. This page outlines eligibility, timelines, and steps for submitting a return.
                    </div>

                    <section>
                        <h2>30-Day Return Period</h2>
                        <p>You may request a return for eligible items within 30 days of delivery. Products must be unused, undamaged, and returned in their original packaging with all included accessories.</p>
                        <p>This helps ensure product safety, compatibility, and fair handling for all customers.</p>
                    </section>

                    <section>
                        <h2>1. Return Eligibility</h2>
                        <h3>Eligible Items</h3>
                        <p>The following items are typically eligible for return:</p>
                        <ul>
                            <li>Unopened printers</li>
                            <li>Unopened ink cartridges</li>
                            <li>Unopened toner cartridges</li>
                            <li>Printing paper and supplies in sealed, original packaging</li>
                            <li>Items received damaged or defective</li>
                            <li>Products shipped in error</li>
                        </ul>
                        <h3>Not Eligible for Return</h3>
                        <p>Due to safety, hygiene, and industry standards, these items cannot be returned:</p>
                        <ul>
                            <li>Opened or used ink or toner cartridges</li>
                            <li>Products damaged due to customer handling</li>
                            <li>Items without original packaging or missing accessories</li>
                            <li>Custom or special-order items</li>
                            <li>Products returned past the 30-day period</li>
                        </ul>
                        <p>If you need help determining eligibility, contact us before sending items back.</p>
                    </section>

                    <section>
                        <h2>2. How to Request a Return</h2>
                        <p><strong>Step 1: Contact Our Support Team</strong></p>
                        <p>Email us at support@printscarts.com with the following:</p>
                        <ul>
                            <li>Order number</li>
                            <li>Product name and condition</li>
                            <li>Reason for return (wrong item, damaged item, incorrect order, etc.)</li>
                            <li>Photos (if the item arrived damaged)</li>
                        </ul>
                        <p><strong>Step 2: Receive RMA & Instructions</strong></p>
                        <p>If your item qualifies, we will send:</p>
                        <ul>
                            <li>A Return Merchandise Authorization (RMA) number</li>
                            <li>Packaging instructions</li>
                            <li>A prepaid or standard return label (depending on reason for return)</li>
                        </ul>
                        <p><strong>Step 3: Prepare the Package</strong></p>
                        <p>Please include:</p>
                        <ul>
                            <li>The unopened product in original packaging</li>
                            <li>Manuals and accessories</li>
                            <li>Packing slip or receipt</li>
                            <li>RMA number clearly visible on the outer label</li>
                        </ul>
                        <p><strong>Step 4: Ship the Item</strong></p>
                        <p>Send the package using the provided return label or your preferred carrier if applicable.</p>
                        <p><strong>Step 5: Refund Processing</strong></p>
                        <p>Once we receive and inspect the returned item, we will issue a refund to the original payment method.</p>
                        <p>Refund processing time: 3–5 business days<br />(Bank timelines may vary.)</p>
                    </section>

                    <section>
                        <h2>3. Return Shipping Costs</h2>
                        <h3>Prints Carts Covers Return Shipping for:</h3>
                        <ul>
                            <li>Damaged or defective items</li>
                            <li>Items sent in error</li>
                            <li>Items missing components upon arrival</li>
                            <li>Incorrect product shipped</li>
                        </ul>
                        <h3>Customer Pays Return Shipping for:</h3>
                        <ul>
                            <li>Change-of-mind returns</li>
                            <li>Incorrect product ordered by customer</li>
                            <li>Orders under $100 (exceptions apply)</li>
                        </ul>
                        <p>Return shipping costs depend on carrier and package weight.</p>
                    </section>

                    <section>
                        <h2>4. Exchanges</h2>
                        <p>We do not offer direct exchanges at this time.</p>
                        <p>If you need a different product:</p>
                        <ul>
                            <li>Return the original item (if eligible)</li>
                            <li>Place a new order for the correct item</li>
                        </ul>
                        <p>This ensures accurate processing and faster fulfillment.</p>
                    </section>

                    <section>
                        <h2>5. Damaged or Defective Items</h2>
                        <p>If your item arrives damaged or not functioning:</p>
                        <ul>
                            <li>Contact us within 48 hours of delivery</li>
                            <li>Include photos of the item and packaging</li>
                            <li>Describe the issue clearly</li>
                        </ul>
                        <p>We will provide a prompt resolution, which may include:</p>
                        <ul>
                            <li>A full refund</li>
                            <li>A replacement (when available)</li>
                            <li>Return label and instructions</li>
                        </ul>
                        <p>There are no restocking fees for damaged or defective item returns.</p>
                    </section>

                    <section>
                        <h2>6. Cancellations</h2>
                        <p>Orders may be canceled before they have shipped.</p>
                        <p>To cancel an order:</p>
                        <ul>
                            <li>Email us as soon as possible with your order number</li>
                        </ul>
                        <p>If the order has already shipped, it must be returned following our standard return process.</p>
                    </section>

                    <section>
                        <h2>7. International & Cross-Border Returns (United States & Canada)</h2>
                        <p>We ship orders across the United States and Canada.</p>
                        <p>For returns from Canada:</p>
                        <ul>
                            <li>The same 30-day return window applies</li>
                            <li>Customers are responsible for return shipping unless the item is defective or incorrect</li>
                            <li>Customs duties or international taxes are non-refundable</li>
                        </ul>
                        <p>Refunds will be issued in the original currency.</p>
                    </section>

                    <section>
                        <h2>8. Additional Notices</h2>
                        <ul>
                            <li>Product availability, pricing, and specifications may change without notice</li>
                            <li>Delivery times vary due to carrier operations and location</li>
                            <li>Manufacturer warranties apply to eligible products as provided by their respective brands</li>
                            <li>Prints Carts operates independently and is not an authorized dealer for any manufacturer</li>
                            <li>All trademarks belong to their respective owners and are used for identification only</li>
                        </ul>
                    </section>

                    <section className="assistance-hub" style={{ background: '#0f3d91', color: '#fff', padding: '60px', borderRadius: '48px', marginTop: '80px', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', border: 'none', padding: 0, marginBottom: '16px' }}>Need Help with a Return or Refund?</h2>
                        <p style={{ marginBottom: '48px', opacity: 0.9 }}>If you have questions or need assistance, we’re here to help.</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
                             <a href="mailto:support@printscarts.com" style={{ background: '#ffffff', color: '#0f3d91', padding: '20px 40px', borderRadius: '20px', textDecoration: 'none', fontWeight: '900', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <FiMail size={20} /> support@printscarts.com
                             </a>
                             <button onClick={() => window.dispatchEvent(new CustomEvent('open-live-chat'))} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '20px 40px', borderRadius: '20px', fontWeight: '900', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                                <FiMessageSquare size={20} /> Live Chat Available
                             </button>
                        </div>
                        <p style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>🌐 Website: www.printscarts.com</p>
                        <p style={{ marginTop: '12px', fontSize: '14px', opacity: 0.7 }}>We aim to respond promptly during normal business hours.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-RP-2026-V1</span>
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

export default RefundReturnPolicy;


