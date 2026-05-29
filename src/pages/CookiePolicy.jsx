'use client';
import React from 'react';
import '../styles/PolicyPages.css';

const CookiePolicy = () => {
    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Cookie Policy – Prints Carts</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        This Cookie Policy explains how Prints Carts (“we,” “our,” or “us”) uses cookies and similar technologies on www.printscarts.com. Our goal is to provide a clear and transparent explanation of how cookies support essential website functions.<br /><br />
                        By using our website, you acknowledge and agree to the use of cookies as described below. You may manage cookie preferences through your browser settings at any time.
                    </div>

                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, keep items in your cart, and enable core functionality.</p>
                        <p>Cookies do not give us access to your computer or share personal information unless you voluntarily provide it.</p>
                    </section>

                    <section>
                        <h2>2. Types of Cookies We Use</h2>
                        <p>Prints Carts uses only essential and functional cookies necessary to operate the website. We do not use advertising, retargeting, behavioral, or third-party marketing cookies. Below is a breakdown of cookie types:</p>
                        
                        <h3>A. Strictly Necessary Cookies</h3>
                        <p>These cookies are required for the website to function properly. They support:</p>
                        <ul>
                            <li>Secure checkout</li>
                            <li>Shopping cart processes</li>
                            <li>Login and account access</li>
                            <li>Page navigation</li>
                            <li>Fraud prevention</li>
                            <li>Session management</li>
                        </ul>
                        <p>These cookies cannot be disabled through our website but can be blocked in your browser (may affect functionality).</p>
                        <p>Examples:</p>
                        <ul>
                            <li>Session ID cookies</li>
                            <li>Checkout authentication cookies</li>
                            <li>Security and fraud-prevention cookies</li>
                        </ul>
                        <p><strong>User Consent Required?</strong> No. These are essential for core operation.</p>

                        <h3>B. Functional Cookies</h3>
                        <p>These cookies enhance user convenience and improve browsing experience. They help:</p>
                        <ul>
                            <li>Remember language or region preferences</li>
                            <li>Maintain simple settings for your next visit</li>
                            <li>Improve basic website performance</li>
                        </ul>
                        <p>Examples: Preference cookies, Layout customization cookies</p>
                        <p><strong>User Consent Required?</strong> Consent is implied through continued use of the website.</p>
                    </section>

                    <section>
                        <h2>3. Cookies We Do NOT Use</h2>
                        <p>To maintain transparency and advertising compliance, Prints Carts does NOT use:</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>❌ Third-party advertising cookies</li>
                            <li>❌ Behavioral retargeting cookies</li>
                            <li>❌ Social media tracking pixels</li>
                            <li>❌ Analytics or performance tracking tools that collect personal identifiers</li>
                            <li>❌ Cross-site tracking technologies</li>
                            <li>❌ Automated profiling tools</li>
                        </ul>
                        <p>Our cookie usage is limited to essential e-commerce operations only.</p>
                    </section>

                    <section>
                        <h2>4. Why We Use Cookies</h2>
                        <p>Cookies help us provide a smooth, secure, and user-friendly shopping experience. Key purposes include:</p>
                        <ul>
                            <li>Keeping your cart active even if you leave the page</li>
                            <li>Securing account login sessions</li>
                            <li>Supporting checkout functionality</li>
                            <li>Maintaining website stability</li>
                            <li>Remembering basic preferences</li>
                            <li>Protecting the website from unauthorized activity</li>
                        </ul>
                        <p>Disabling cookies may prevent certain areas of the website from functioning correctly.</p>
                    </section>

                    <section>
                        <h2>5. How to Manage or Disable Cookies</h2>
                        <p>You can control cookie settings through your browser. Each browser has different tools for managing cookies. Browser Instructions:</p>
                        <ul>
                            <li>Google Chrome: Settings → Privacy and Security → Cookies and Other Site Data</li>
                            <li>Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                            <li>Safari (Mac/iOS): Preferences → Privacy → Block All Cookies</li>
                            <li>Microsoft Edge: Settings → Cookies and Site Permissions → Manage Cookies</li>
                        </ul>
                        <p>You may block or delete cookies at any time. However, disabling essential cookies may cause issues with: Checkout, Login, Cart functionality, Order placement.</p>
                    </section>

                    <section>
                        <h2>6. Third-Party Tools and Integrations</h2>
                        <p>Prints Carts does not use third-party advertising integrations. Some essential service providers (e.g., payment processors or hosting services) may use necessary cookies solely for functionality and security. These cookies do not collect personal information for marketing or tracking across websites.</p>
                    </section>

                    <section>
                        <h2>7. Data Privacy & Cookies</h2>
                        <p>Any personal information collected through cookies is processed in accordance with our Privacy Policy. We do not sell or share user data for advertising purposes under any privacy law, including CCPA/CPRA.</p>
                    </section>

                    <section>
                        <h2>8. Updates to This Cookie Policy</h2>
                        <p>We may update this Cookie Policy occasionally to reflect legal requirements or website changes. The updated policy will be posted on this page with a revised “Last Updated” date.</p>
                    </section>

                    <section>
                        <h2>9. Contact Us</h2>
                        <p>If you have questions about our Cookie Policy or how we use cookies, feel free to contact us:</p>
                        <p>
                            📧 Email: support@printscarts.com<br />
                            📍 Address: 7181 Beacon Dr 15, Reno, NV 89506<br />
                            🌐 Website: www.printscarts.com
                        </p>
                        <p>We are happy to help clarify anything related to privacy or website functionality.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-CP-2026-V1</span>
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

export default CookiePolicy;



