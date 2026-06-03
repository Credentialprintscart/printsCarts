'use client';
import React, { useState } from 'react';
import { FiClock, FiTruck, FiRefreshCw, FiCheckCircle, FiMail, FiMessageSquare } from 'react-icons/fi';
import '../styles/PolicyPages.css';

const ReturnExchangePolicy = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="policy-page-wrapper">
            
            <main className="policy-simple-container">
                <div className="policy-simple-header">
                    <h1>Return & Exchange Policy – Prints Carts</h1>
                    <p className="last-updated">Last Updated: January 26, 2026</p>
                </div>

                <div className="policy-simple-content">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
                        <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <FiClock size={24} color="#0f3d91" style={{ marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>30-Day Return Window</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>You may return eligible items within 30 days of the delivery date, provided they meet the return guidelines listed below.</p>
                        </div>
                        <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <FiTruck size={24} color="#0f3d91" style={{ marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Prepaid Return Shipping</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>For approved returns, Prints Carts provides prepaid return labels to make the return process simple and convenient.</p>
                        </div>
                        <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <FiRefreshCw size={24} color="#0f3d91" style={{ marginBottom: '16px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Fast Refund Processing</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Once your return is received and inspected, refunds are issued within 3–5 business days to your original payment method.</p>
                        </div>
                    </div>

                    <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px', border: '1.5px solid #f1f5f9', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', marginBottom: '80px' }}>
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '8px', border: 'none', padding: 0 }}>Start a Return or Exchange</h2>
                                <p style={{ fontSize: '15px', color: '#64748b' }}>Enter your details below to initiate the process.</p>
                            </div>

                            {isSubmitted ? (
                                <div style={{ padding: '40px', textAlign: 'center', background: '#f0fdf4', borderRadius: '24px', border: '1px solid #bbf7d0' }}>
                                    <FiCheckCircle size={40} color="#16a34a" style={{ marginBottom: '16px' }} />
                                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#166534', marginBottom: '8px' }}>Request Submitted</h3>
                                    <p style={{ color: '#15803d', fontSize: '14px' }}>Our specialists will contact you with your RMA and shipping label shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Order Number (Optional)</label>
                                        <input type="text" placeholder="Enter your order number (optional)" style={{ width: '100%', padding: '14px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Reason for Return / Exchange</label>
                                        <select required style={{ width: '100%', padding: '14px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none' }}>
                                            <option value="">Select a reason</option>
                                            <option>Wrong item received</option>
                                            <option>Item arrived damaged</option>
                                            <option>Item is defective</option>
                                            <option>Ordered by mistake</option>
                                            <option>Not compatible with my needs</option>
                                            <option>Other (please specify)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Preferred Resolution</label>
                                        <select required style={{ width: '100%', padding: '14px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none' }}>
                                            <option value="">Choose an option</option>
                                            <option>Refund</option>
                                            <option>Exchange for the same item (if available)</option>
                                            <option>Exchange for another item (optional)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Additional Details</label>
                                        <textarea rows="4" placeholder="Write here..." style={{ width: '100%', padding: '14px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', resize: 'none' }}></textarea>
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '18px', background: '#0f3d91', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' }}>Submit Return Request</button>
                                </form>
                            )}
                        </div>
                    </div>

                    <section>
                        <h2>Return Guidelines</h2>
                        <h3>Eligible Items</h3>
                        <ul>
                            <li>Unopened printers, ink, toner, accessories, and paper products</li>
                            <li>Defective items (even if opened), following inspection and approval</li>
                        </ul>
                        <h3>Non-Returnable Items</h3>
                        <ul>
                            <li>Used or partially used cartridges (unless defective)</li>
                            <li>Digital or downloadable items</li>
                            <li>Custom or special-order products</li>
                            <li>Items not in original packaging</li>
                        </ul>
                        <h3>Packaging Requirements</h3>
                        <ul>
                            <li>Must include the original box, manuals, cables, and all accessories</li>
                            <li>Items must be securely packed to prevent shipping damage</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Exchange Process</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {[
                                { step: '01', title: 'Start a Request', text: 'Submit your request using the form above.' },
                                { step: '02', title: 'Approval Stage', text: 'Receive approval and your prepaid return label (when applicable).' },
                                { step: '03', title: 'Logistics', text: 'Ship the item back in its original packaging.' },
                                { step: '04', title: 'Inspection & Processing', text: 'Refunds and exchanges are typically processed within 3–5 business days after the product is received.' }
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#0f3d91', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0 }}>{s.step}</div>
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>{s.title}</h4>
                                        <p style={{ fontSize: '14px', color: '#64748b' }}>{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="assistance-hub" style={{ background: '#0f3d91', color: '#fff', padding: '60px', borderRadius: '48px', marginTop: '80px', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', border: 'none', padding: 0, marginBottom: '16px' }}>Need Assistance?</h2>
                        <p style={{ marginBottom: '48px', opacity: 0.9 }}>Our technical support team is standing by to assist with your return.</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
                             <a href="mailto:support@printscarts.com" style={{ background: '#ffffff', color: '#0f3d91', padding: '20px 40px', borderRadius: '20px', textDecoration: 'none', fontWeight: '900', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FiMail size={20} /> support@printscarts.com
                             </a>
                        </div>
                        <p style={{ marginTop: '40px', fontSize: '14px', opacity: 0.7 }}>Official Support Site: www.printscarts.com</p>
                    </section>
                </div>
            </main>
            
        </div>
    );
};

export default ReturnExchangePolicy;


