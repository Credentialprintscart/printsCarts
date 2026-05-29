import React from 'react';
import Link from 'next/link';
import './HomeHero.css';

import heroImage from '@/assets/hero.jpeg';

const HomeHero = () => {
    return (
        <section className="home-hero">
            <div className="home-hero-background-container">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=75&fm=webp" 
                    srcSet="https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&q=75&fm=webp 640w,
                            https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=75&fm=webp 1200w,
                            https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=75&fm=webp 1920w"
                    alt="Hero Background" 
                    className="home-hero-bg-img"
                    sizes="100vw"
                    loading="eager"
                    decoding="async"
                    width="1920"
                    height="1080"
                    onLoad={(e) => e.currentTarget.style.opacity = 1}
                />
                <div className="home-hero-overlay"></div>
            </div>
            <div className="home-hero-content">
                <div className="home-hero-text">
                    <h1>
                        Print Smart. Choose Better. Shop with Confidence.
                    </h1>
                    <p className="hero-mission ">
                        Find reliable printers, ink, toner, and printing essentials for home and office needs.
                    </p>
                    <p className="hero-mission">
                        At Prints Carts, we make it simple to explore genuine-quality products with clear information,
                        smooth browsing, and a customer-first shopping experience.
                    </p>

                    <div className="home-hero-actions">
                        <Link href="/printers" className="home-btn primary">Shop Now</Link>
                    </div>
                </div>

                    <div className="home-hero-image">
                    <img
                        src={heroImage.src || heroImage}
                        alt="Modern printer setup"
                        decoding="async"
                        width="1200"
                        height="700"
                    />
                    </div>
            </div>
        </section>
    );
};

export default HomeHero;
