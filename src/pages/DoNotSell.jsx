'use client';
import React from 'react';
import '../styles/PolicyPages.css';

const DoNotSell = () => {
    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Do Not Sell or Share My Personal Information</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        This page explains your privacy rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). These laws provide California residents with the right to control how their personal information is collected, used, and shared.<br /><br />
                        Prints Carts respects your privacy and is committed to handling your personal information responsibly and transparently.
                    </div>

                    <section>
                        <h2>1. We Do NOT Sell or Share Personal Information</h2>
                        <p>Prints Carts does not sell, share, or exchange personal information for advertising, remarketing, behavioral tracking, or commercial data-sharing purposes as defined under CCPA/CPRA.</p>
                        <p>We do not:</p>
                        <ul>
                            <li>Sell personal information to third parties</li>
                            <li>Share personal information for cross-context behavioral advertising</li>
                            <li>Use third-party advertising cookies</li>
                            <li>Use retargeting or remarketing systems</li>
                            <li>Transfer data for marketing purposes without consent</li>
                        </ul>
                        <p>Your personal information is used only for essential business functions such as order processing, secure payments, and customer communication.</p>
                    </section>

                    <section>
                        <h2>2. Your Privacy Rights Under CCPA/CPRA</h2>
                        <p>California residents have the following rights:</p>
                        <h3>Right to Know</h3>
                        <p>You may request information about the personal data we collect, use, disclose, or retain.</p>
                        <h3>Right to Delete</h3>
                        <p>You may request deletion of your personal information, subject to legal requirements.</p>
                        <h3>Right to Correct</h3>
                        <p>You may request corrections to inaccurate information we hold.</p>
                        <h3>Right to Opt Out of Sale or Sharing</h3>
                        <p>You may opt out of any sale or sharing of personal information.<br />
                        (We do not sell or share information, but this right is still offered.)</p>
                        <h3>Right to Limit Use of Sensitive Information</h3>
                        <p>You may request restrictions on the use of sensitive personal information.</p>
                        <h3>Right to Non-Discrimination</h3>
                        <p>We will never deny services, charge different prices, or treat you differently for exercising your privacy rights.</p>
                    </section>

                    <section>
                        <h2>3. How to Submit a Request</h2>
                        <p>If you wish to exercise any CCPA/CPRA privacy rights, you can contact us using the options below.</p>
                        
                        <h3>📧 Email Request</h3>
                        <p>Send your request to:<br />
                        <strong>support@printscarts.com</strong></p>
                        <p>Please include:</p>
                        <ul>
                            <li>Your name</li>
                            <li>Your contact email</li>
                            <li>The specific request (Access, Delete, Correct, Opt-Out, etc.)</li>
                        </ul>

                        <h3>📬 Mailing Address Request</h3>
                        <p>
                            Prints Carts<br />
                            7181 Beacon Dr 15<br />
                            Reno, NV 89506<br />
                            United States
                        </p>

                        <h3>Identity Verification</h3>
                        <p>To protect your privacy, we may request additional information to verify your identity before processing your request.</p>
                    </section>

                    <section>
                        <h2>4. Categories of Personal Information We Collect</h2>
                        <p>We collect only information necessary for essential e-commerce operations, such as:</p>
                        <ul>
                            <li>Name and contact details</li>
                            <li>Shipping and billing address</li>
                            <li>Email for order confirmations</li>
                            <li>Payment details (processed securely through third-party payment systems)</li>
                            <li>Order history</li>
                            <li>Basic website session data (non-marketing cookies)</li>
                        </ul>
                        <p>We do not collect biometric, geolocation, or highly sensitive information for marketing purposes.</p>
                        <p>Full details are provided in our Privacy Policy.</p>
                    </section>

                    <section>
                        <h2>5. Purposes for Using Personal Information</h2>
                        <p>We use personal information for:</p>
                        <ul>
                            <li>Order processing & fulfillment</li>
                            <li>Secure payments</li>
                            <li>Shipping and delivery</li>
                            <li>Customer support</li>
                            <li>Website functionality</li>
                            <li>Fraud prevention</li>
                            <li>Legal compliance</li>
                        </ul>
                        <p>We do NOT use your information for:</p>
                        <ul>
                            <li>Behavioral advertising</li>
                            <li>Cross-site tracking</li>
                            <li>Selling data</li>
                            <li>Profiling for marketing purposes</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Third-Party Service Providers</h2>
                        <p>We share data only with essential service providers such as:</p>
                        <ul>
                            <li>Payment processors</li>
                            <li>Shipping carriers</li>
                            <li>Customer communication tools</li>
                            <li>Fraud-prevention services</li>
                            <li>Hosting and IT infrastructure providers</li>
                        </ul>
                        <p>These partners are contractually required to handle information securely and cannot use it for advertising or resale.</p>
                    </section>

                    <section>
                        <h2>7. Minors’ Personal Information</h2>
                        <p>We do not knowingly collect personal information from individuals under age 13.</p>
                        <p>We do not sell or share data of minors under age 16.</p>
                    </section>

                    <section>
                        <h2>8. Updates to This Notice</h2>
                        <p>We may update this notice as privacy laws evolve or our business practices change.</p>
                        <p>The updated version will always appear on this page with a revised Last Updated date.</p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>If you have questions about your privacy rights or this notice:</p>
                        <p>
                            📧 Email: support@printscarts.com<br />
                            📍 Address: 7181 Beacon Dr 15, Reno, NV 89506<br />
                            🌐 Website: www.printscarts.com
                        </p>
                        <p>We are committed to responding within a reasonable timeframe.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-DNS-2026-V1</span>
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

export default DoNotSell;



