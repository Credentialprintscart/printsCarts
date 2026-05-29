import React from 'react';
import './AboutHero.css';

const AboutHero = () => {
    return (
        <section className="about-hero">
            <div className="about-hero-content">
                <span className="hero-tag">About Us – Prints Carts</span>
                <h2 className="hero-subtitle">Your Reliable Destination for Printers & Printing Essentials</h2>
                <div className="hero-description-container">
                    <p className="hero-description-main">
                        Prints Carts is an independent online retailer offering a curated selection of printers,
                        ink cartridges, toner, and everyday printing supplies. Our mission is to make shopping
                        for printing products simple, clear, and stress-free for individuals, homes, and small businesses.
                    </p>
                    <p className="hero-description-sub">
                        We understand that choosing the right printing products can sometimes feel overwhelming.
                        That's why we focus on accurate information, easy navigation, and responsive customer
                        assistance—so you can shop confidently and make informed decisions every time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
