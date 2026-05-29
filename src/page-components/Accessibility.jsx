'use client';
import React from 'react';
import '../styles/PolicyPages.css';

const Accessibility = () => {
    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Accessibility Statement – Prints Carts</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div className="intro">
                        Prints Carts is committed to making our website accessible and usable for all individuals, including people with disabilities. We believe everyone should have a barrier-free shopping experience and equal access to the information and services offered on www.printscarts.com.<br /><br />
                        We continually improve our website to meet accessibility standards and provide a positive experience for all visitors.
                    </div>

                    <section>
                        <h2>1. Our Commitment</h2>
                        <p>We aim to follow best practices based on widely recognized accessibility guidelines, including:</p>
                        <ul>
                            <li>WCAG 2.1 AA standards (Web Content Accessibility Guidelines)</li>
                            <li>ADA Title III principles</li>
                            <li>Section 508 recommendations where applicable</li>
                        </ul>
                        <p>Our goal is to make our website readable, navigable, and usable with assistive technologies.</p>
                    </section>

                    <section>
                        <h2>2. Accessibility Features on Our Website</h2>
                        <p>To support accessibility, Prints Carts includes features such as:</p>
                        
                        <p><strong>✔ Keyboard navigation support</strong><br />
                        Users can move through menus, links, and sections using keyboard-only navigation.</p>

                        <p><strong>✔ Screen reader compatibility</strong><br />
                        We design pages to be readable by screen readers and assistive tools.</p>

                        <p><strong>✔ Text alternatives</strong><br />
                        Images include descriptive alt tags wherever appropriate.</p>

                        <p><strong>✔ Consistent headings & structure</strong><br />
                        Clear headings help visitors understand page organization.</p>

                        <p><strong>✔ Adjustable text size</strong><br />
                        Users can zoom in or adjust browser text settings without losing functionality.</p>

                        <p><strong>✔ Clear color contrast</strong><br />
                        We aim to use readable text and visual elements that meet WCAG contrast guidelines.</p>

                        <p><strong>✔ Simple and predictable navigation</strong><br />
                        Menus and page layouts remain consistent across the site.</p>
                    </section>

                    <section>
                        <h2>3. Ongoing Accessibility Efforts</h2>
                        <p>Accessibility is a continuous process. We regularly:</p>
                        <ul>
                            <li>Review website content</li>
                            <li>Improve navigation</li>
                            <li>Test pages for usability</li>
                            <li>Update features to support more assistive tools</li>
                            <li>Integrate suggestions from users</li>
                        </ul>
                        <p>We are committed to making reasonable changes as technology evolves.</p>
                    </section>

                    <section>
                        <h2>4. Third-Party Tools & Content</h2>
                        <p>Some tools or links on our website may be provided by third parties (e.g., payment processors, shipping carriers). While we cannot control third-party accessibility practices, we encourage these partners to support inclusive experiences.</p>
                    </section>

                    <section>
                        <h2>5. Having Difficulty Accessing Our Website?</h2>
                        <p>We genuinely want to help.</p>
                        <p>If you experience any difficulty browsing or using our website, you may contact us for assistance.</p>
                        
                        <h3>📧 Email Support</h3>
                        <p>support@printscarts.com</p>

                        <h3>📍 Mailing Address</h3>
                        <p>
                            Prints Carts<br />
                            7181 Beacon Dr 15<br />
                            Reno, NV 89506<br />
                            United States
                        </p>

                        <p>Please describe:</p>
                        <ul>
                            <li>The page or feature you were trying to access</li>
                            <li>The nature of the issue</li>
                            <li>Any assistive technology you were using</li>
                        </ul>
                        <p>We will work to resolve the issue promptly.</p>
                    </section>

                    <section>
                        <h2>6. Feedback & Suggestions</h2>
                        <p>We value accessibility feedback. If you have ideas or recommendations that may help improve your experience, please contact us.<br />
                        Your input helps us continue to improve accessibility for all users.</p>
                    </section>

                    <section>
                        <h2>7. Commitment to Improvement</h2>
                        <p>Prints Carts will continue reviewing website features and making updates to ensure accessibility remains a priority. Our goal is to provide all customers with a comfortable, inclusive, and user-friendly shopping experience.</p>
                    </section>
                </div>

                <div className="policy-document-footer">
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Document Reference: PC-AS-2026-V1</span>
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

export default Accessibility;



