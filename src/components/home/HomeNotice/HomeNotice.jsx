import React from 'react';
import './HomeNotice.css';

const HomeNotice = () => {
    const notices = [
        'Product availability, pricing, and specifications may change without prior notice.',
        'Delivery times vary based on location, courier service, and product availability.',
        'Manufacturer warranties apply to eligible products as provided by their respective brands.',
        'Prints Carts provides retail services independently and does not represent or act as an authorized dealer of any manufacturer.'
    ];

    return (
        <section className="home-notice">
            <div className="notice-container">
                <h2 className="section-title">Important Notice</h2>
                <ul className="notice-list">
                    {notices.map((notice, index) => (
                        <li key={index}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span>{notice}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HomeNotice;
