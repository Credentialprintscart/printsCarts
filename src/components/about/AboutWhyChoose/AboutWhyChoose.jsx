import React from 'react';
import './AboutWhyChoose.css';

const AboutWhyChoose = () => {
    return (
        <section className="why-choose-us">
            <div className="why-choose-container">
                <h2 className="section-title">Why Customers Choose Prints Carts</h2>
                <div className="choose-grid">
                    <div className="choose-card">
                        <div className="card-number">01</div>
                        <h3>Dependable Shopping Experience</h3>
                        <p>
                            We streamline the entire buying process—from browsing to checkout—so customers can
                            enjoy a simple and reliable online shopping journey.
                        </p>
                    </div>
                    <div className="choose-card">
                        <div className="card-number">02</div>
                        <h3>Trustworthy Product Listings</h3>
                        <p>
                            We provide accurate details based on manufacturer specifications and verified product
                            information.
                        </p>
                    </div>
                    <div className="choose-card">
                        <div className="card-number">03</div>
                        <h3>Professional Customer Care</h3>
                        <p>
                            Our priority is to provide helpful and timely responses to inquiries related to orders
                            and product availability.
                        </p>
                    </div>
                    <div className="choose-card">
                        <div className="card-number">04</div>
                        <h3>Independent Retail Approach</h3>
                        <p>
                            You receive transparent information, unbiased listings, and a trustworthy retail environment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutWhyChoose;
