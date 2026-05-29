import React from 'react';
import './AboutVisionValues.css';

const AboutVisionValues = () => {
    return (
        <section className="vision-values">
            <div className="vision-values-container">
                <div className="vision-section">
                    <h2 className="section-title">Our Vision</h2>
                    <div className="vision-content">
                        <p className="vision-lead">
                            To be a dependable and customer-centered retailer that makes it easier for people to shop
                            for printing essentials with confidence, clarity, and convenience.
                        </p>
                        <p>
                            We aim to consistently improve our website experience, expand our product selection, and
                            maintain the high standards of accuracy and professionalism that today's customers expect.
                        </p>
                    </div>
                </div>

                <div className="values-section">
                    <h2 className="section-title">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🛡️</div>
                            <h3>Reliability</h3>
                            <p>We prioritize products and processes that support a smooth customer experience.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🔍</div>
                            <h3>Clarity</h3>
                            <p>We focus on accurate product information and straightforward communication.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3>Integrity</h3>
                            <p>We operate with honesty and uphold strong retail and privacy standards.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🌟</div>
                            <h3>Customer Respect</h3>
                            <p>We treat every interaction with care, professionalism, and courtesy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutVisionValues;
