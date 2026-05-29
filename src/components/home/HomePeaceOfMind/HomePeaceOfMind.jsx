'use client';
import React from 'react';
import Link from 'next/link';
import './HomePeaceOfMind.css';

const HomePeaceOfMind = () => {
    return (
        <section className="home-peace">
            <div className="peace-container">
                <div className="peace-content">
                    <h2>Shop with Peace of Mind</h2>
                    <p>
                        Whether you're printing school assignments, home documents, or business materials,
                        Prints Carts makes it easy to find dependable printing essentials without complexity.
                    </p>
                    <p>
                        Browse our collections, explore detailed product information, and enjoy a smooth,
                        transparent, and user-friendly shopping experience.
                    </p>
                    <div className="peace-actions">
                        <Link href="/printers" className="home-btn primary">Browse Printers</Link>
                        <Link href="/ink-toner" className="home-btn secondary">Shop Ink & Toner</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePeaceOfMind;

