'use client';

import React from 'react';
import {
    LayoutGrid,
    Info,
    Lock,
    MessageSquare
} from 'lucide-react';
import './AboutOffers.css';

const offers = [
    {
        icon: <LayoutGrid size={30} />,
        title: 'A Diverse Selection of Printing Essentials',
        description:
            'From compact home-use printers to office-ready machines, and from ink and toner to printer-friendly paper, Prints Carts provides a wide range of products to meet different printing needs.',
    },
    {
        icon: <Info size={30} />,
        title: 'Accurate Product Details',
        description:
            'We ensure that product descriptions, compatibility information, and specifications are presented clearly. This helps you choose the right items without confusion or uncertainty.',
    },
    {
        icon: <Lock size={30} />,
        title: 'Convenient & Secure Shopping Experience',
        description:
            'Our website is designed for easy browsing, simple checkout, and secure payment processing. We use industry-standard practices to help protect your personal information.',
    },
    {
        icon: <MessageSquare size={30} />,
        title: 'Customer-Focused Assistance',
        description: 'Our support team is available to help with:',
        details: [
            'Product inquiries',
            'Order status updates',
            'Basic questions about printing supplies'
        ],
        note: 'While we do not provide repair, setup, or troubleshooting services, we are always happy to assist with shopping-related questions.'
    },
];

const AboutOffers = () => {
    return (
        <section className="offers-section">
            <div className="offers-container">
                <h2 className="offers-title">What We Offer</h2>

                <div className="offers-grid">
                    {offers.map((item, index) => (
                        <div className="offer-card" key={index}>
                            <div className="offer-icon">
                                {item.icon}
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>
                            
                            {item.details && (
                                <ul className="offer-details-list">
                                    {item.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                            
                            {item.note && (
                                <p className="offer-note">{item.note}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutOffers;