import React from 'react';
import './HomeCommitment.css';

const HomeCommitment = () => {
    return (
        <section className="home-commitment">
            <div className="commitment-container">
                <div className="commitment-content">
                    <h2 className="section-title">Our Commitment to You</h2>
                    <p>
                        At Prints Carts, we believe in honest communication, transparent product listings,
                        and human-friendly customer service. We aim to provide a helpful experience
                        where customers feel informed, supported, and confident in their purchases.
                    </p>
                    <p>
                        We continuously improve our platform to make browsing, comparing, and
                        purchasing printing essentials more convenient.
                    </p>
                </div>
                <div className="commitment-stats">
                    <div className="stat-item">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Transparent</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">24/7</span>
                        <span className="stat-label">Secure Shop</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">Fast</span>
                        <span className="stat-label">Delivery</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCommitment;
