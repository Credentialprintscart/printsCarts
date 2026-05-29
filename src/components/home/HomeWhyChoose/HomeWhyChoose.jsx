import React from 'react';
import './HomeWhyChoose.css';

const HomeWhyChoose = () => {
    const reasons = [
        {
            title: 'Clear, Accurate Product Information',
            description: 'Each product listing includes detailed descriptions, compatibility information, and specifications so you can choose the right item without confusion.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            )
        },
        {
            title: 'Customer-Centered Experience',
            description: 'We offer responsive assistance for product inquiries, order updates, and general questions—ensuring your shopping experience remains smooth and worry-free.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            )
        },
        {
            title: 'Fast & Dependable Shipping',
            description: 'We work with trusted carriers to ensure safe and timely delivery across the United States and Canada. Delivery times may vary based on location and availability.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
            )
        },
        {
            title: 'Wide Selection for Every Need',
            description: 'From compact home printers to office-ready devices, and from ink cartridges to everyday printing supplies, Prints Carts offers a broad range of options to meet different printing requirements.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
            )
        },
        {
            title: 'Secure Online Shopping',
            description: 'We use secure checkout processes and industry-standard practices to help protect your personal information.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            )
        }
    ];

    return (
        <section className="home-why-choose">
            <div className="why-choose-container">
                <h2 className="section-title text-center">Why Shop with Prints Carts?</h2>
                <div className="why-choose-grid">
                    {reasons.map((reason, index) => (
                        <div key={index} className="why-card">
                            <div className="why-icon-container">
                                {reason.icon}
                            </div>
                            <div className="why-content">
                                <h3>{reason.title}</h3>
                                <p>{reason.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeWhyChoose;
