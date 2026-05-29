import React from 'react';
import './AboutWhoWeAre.css';

const AboutWhoWeAre = () => {
    return (
        <section className="who-we-are">
            <div className="who-we-are-container">
                <div className="who-we-are-header">
                    <span className="section-tag">Since Our Inception</span>
                    <h2>Who We Are</h2>
                </div>
                <div className="who-we-are-content">
                    <p className="who-we-are-highlight">
                        Prints Carts was created with a straightforward goal: 
                        <strong> to provide reliable products with transparent information and a smooth online shopping experience.</strong>
                    </p>
                    <div className="who-we-are-details">
                        <p>
                            We operate independently and are not directly affiliated with any printer manufacturer.
                            Our platform brings together a range of genuine-quality products sourced through trusted
                            channels so consumers can conveniently find what they need in one place.
                        </p>
                        <p>
                            What sets us apart is our commitment to clarity, customer care, and consistent professionalism.
                            Whether you're restocking ink or upgrading your home printer, we aim to offer a straightforward
                            retail experience built around honesty and ease.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutWhoWeAre;
