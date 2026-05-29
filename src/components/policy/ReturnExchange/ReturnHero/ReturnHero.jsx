import React from 'react';
import './ReturnHero.css';

const ReturnHero = () => {
    return (
        <section className="return-hero">
            <div className="return-hero-content">
                <h1>Return & Exchange Policy</h1>
                <div className="policy-highlights">
                    <div className="highlight-item">
                        <div className="highlight-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="highlight-text">
                            <h3>30-Day Return Window</h3>
                            <p>Return eligible items within 30 days of delivery.</p>
                        </div>
                    </div>

                    <div className="highlight-item">
                        <div className="highlight-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                        <div className="highlight-text">
                            <h3>Prepaid Return Shipping</h3>
                            <p>Simple and convenient prepaid return labels provided.</p>
                        </div>
                    </div>

                    <div className="highlight-item">
                        <div className="highlight-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="highlight-text">
                            <h3>Fast Refund Processing</h3>
                            <p>Refunds issued within 3–5 business days after inspection.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnHero;
