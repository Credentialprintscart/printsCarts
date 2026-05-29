'use client';
import React from 'react';
import './AboutCommitment.css';

const AboutCommitment = () => {
    return (
        <section className="transparency-commitment">
            <div className="commitment-inner-container">
                <h2 className="section-title">Our Commitment to Transparency</h2>
                <div className="commitment-grid">
                    <div className="commitment-intro">
                        <p>We value honesty in everything we do. This includes:</p>
                        <ul className="transparency-list">
                            <li>Clear communication</li>
                            <li>Straightforward policies</li>
                            <li>Accurate representation of all products</li>
                            <li>Respect for customer privacy</li>
                            <li>Independent retail operations</li>
                        </ul>
                    </div>
                    <div className="trademark-card">
                        <p className="trademark-notice">
                            All trademarks, brand names, and logos featured on our website belong to their respective
                            owners and are used strictly for identification purposes. We do not claim partnership,
                            endorsement, or manufacturer authorization unless explicitly stated.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCommitment;

