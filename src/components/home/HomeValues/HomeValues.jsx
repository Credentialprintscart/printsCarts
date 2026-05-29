'use client';
import React from 'react';
import './HomeValues.css';

const HomeValues = () => {
    const values = [
        {
            title: 'Reliability',
            description: 'We prioritize consistent product quality and dependable order handling.',
            icon: '🛡️'
        },
        {
            title: 'Transparency',
            description: 'All product names, descriptions, images, and specifications are presented clearly and accurately.',
            icon: '💎'
        },
        {
            title: 'Customer Care',
            description: 'Our team is here to assist with product questions, order inquiries, and general shopping support.',
            icon: '🤝'
        },
        {
            title: 'Independence',
            description: 'Prints Carts is an independent retailer.',
            subDescription: 'We are not affiliated with or endorsed by any printer or technology manufacturer.',
            details: 'All trademarks and brand names belong to their respective owners and are used for identification purposes only.',
            icon: '🗽'
        }
    ];

    return (
        <section className="home-values">
            <div className="values-container">
                <h2 className="section-title text-center">Our Values</h2>
                <div className="values-grid">
                    {values.map((value, index) => (
                        <div key={index} className={`value-card ${value.title === 'Independence' ? 'independence' : ''}`}>
                            <div className="value-icon">{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                            {value.subDescription && <p className="value-description">{value.subDescription}</p>}
                            {value.details && <p className="value-details">{value.details}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeValues;

