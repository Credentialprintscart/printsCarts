'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/PolicyHub.css';

const PolicyHub = () => {
    const router = useRouter();

    const policyCards = [
        {
            id: 'shipping',
            title: 'Shipping Policy',
            description: 'Learn about our shipping methods, delivery times, tracking, and trusted carriers across US & Canada',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            ),
            path: '/shipping-policy',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            description: 'Understand our return process, refund timelines, and how to initiate a return request',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
                </svg>
            ),
            path: '/refund-return-policy',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 'privacy',
            title: 'Privacy Policy',
            description: 'How we collect, use, protect, and manage your personal information and data',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
            ),
            path: '/privacy-policy',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            id: 'terms',
            title: 'Terms & Conditions',
            description: 'Legal terms governing your use of our website, services, and product purchases',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
            ),
            path: '/terms-conditions',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            id: 'cookies',
            title: 'Cookie Policy',
            description: 'Information about cookies, tracking technologies, and how we use them on our site',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.12-4.06.91 1.28 2.39 2.12 4.07 2.12 2.76 0 5-2.24 5-5 0-.63-.15-1.23-.41-1.76C17.39 4.5 20 7.94 20 12c0 4.41-3.59 8-8 8z" />
                    <circle cx="9" cy="9" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="10" cy="15" r="1.5" />
                </svg>
            ),
            path: '/cookie-policy',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            id: 'donotsell',
            title: 'Do Not Sell',
            description: 'Your rights regarding the sale of personal information under privacy regulations',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
                </svg>
            ),
            path: '/do-not-sell',
            gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
        },
        {
            id: 'accessibility',
            title: 'Accessibility',
            description: 'Our commitment to making our website accessible to all users, including those with disabilities',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" />
                </svg>
            ),
            path: '/accessibility',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
            id: 'disclaimer',
            title: 'Disclaimer',
            description: 'Important legal disclaimers about product information, warranties, and liability limitations',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            ),
            path: '/disclaimer',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }
    ];

    const handleCardClick = (path) => {
        router.push(path);
    };

    return (
        <div className="policy-hub-wrapper">
            
            <main className="policy-hub-main">
                {/* Hero Section */}
                <div className="policy-hub-hero">
                    <div className="policy-hub-hero-content">
                        <h1 className="policy-hub-title">Legal & Policy Center</h1>
                        <p className="policy-hub-subtitle">
                            Everything you need to know about our policies, terms, and commitments to you
                        </p>
                        <div className="policy-hub-divider"></div>
                    </div>
                </div>

                {/* Policy Cards Grid */}
                <div className="policy-hub-container">
                    <div className="policy-cards-grid">
                        {policyCards.map((card, index) => (
                            <div
                                key={card.id}
                                className="policy-card"
                                onClick={() => handleCardClick(card.path)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleCardClick(card.path);
                                    }
                                }}
                                aria-label={`Navigate to ${card.title}`}
                            >
                                <div className="policy-card-gradient" style={{ background: card.gradient }}></div>
                                <div className="policy-card-content">
                                    <div className="policy-card-icon" style={{ background: card.gradient }}>
                                        {card.icon}
                                    </div>
                                    <h3 className="policy-card-title">{card.title}</h3>
                                    <p className="policy-card-description">{card.description}</p>
                                    <div className="policy-card-arrow">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info Section */}
                    <div className="policy-hub-footer-info">
                        <div className="policy-info-box">
                            <h3>📋 Last Updated</h3>
                            <p>All policies were last reviewed and updated on <strong>January 26, 2026</strong></p>
                        </div>
                        <div className="policy-info-box">
                            <h3>📧 Questions?</h3>
                            <p>Contact us at <a href="mailto:support@printscarts.com">support@printscarts.com</a> for any policy-related inquiries</p>
                        </div>
                        <div className="policy-info-box">
                            <h3>🔔 Stay Informed</h3>
                            <p>We'll notify you of any significant changes to our policies via email</p>
                        </div>
                    </div>
                </div>
            </main>
            
        </div>
    );
};

export default PolicyHub;


