import React from 'react';
import Link from 'next/link';
import './HomeAbout.css';

import homeAboutImage from '@/assets/homeAboutImage.jpg';

const HomeAbout = () => {
    return (
        <section className="home-about">
            <div className="home-about-container">
                <div className="home-about-content">
                    <h2 className="section-subtitle">About Prints Carts</h2>
                    <h3 className="section-title">Your Trusted Online Destination for Printing Essentials</h3>
                    <p>
                        Prints Carts is an independent online retail platform offering a broad range of printers,
                        genuine-quality ink and toner cartridges, and essential printing supplies. We focus on
                        accuracy, transparency, and customer satisfaction—helping you choose the right products with confidence.
                    </p>
                    <p>
                        Our goal is to make everyday printing easier for homes, small offices, students, and businesses.
                        Whether you’re upgrading your printer or restocking supplies, we provide a straightforward
                        shopping experience designed around clarity, trust, and convenience.
                    </p>
                    <Link href="/about" className="btn-secondary">Learn More About Us</Link>
                </div>
                <div className="home-about-image">
                    <img
                        src={homeAboutImage.src || homeAboutImage}
                        alt="Printing supplies and office setup"
                        loading="lazy"
                        width="1740"
                        height="1056"
                    />
                    <div className="experience-badge">
                        <span className="years">Reliable</span>
                        <span className="text">Service</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
