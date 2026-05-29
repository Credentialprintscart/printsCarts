'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import '../styles/FAQs.css';

const FAQs = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openItemId, setOpenItemId] = useState(null);

    const categories = [
        { id: 'all', label: 'All Questions' },
        { id: 'products', label: 'Products & Compatibility' },
        { id: 'ordering', label: 'Ordering & Payments' },
        { id: 'shipping', label: 'Shipping & Delivery' },
        { id: 'returns', label: 'Returns & Refunds' },
        { id: 'account', label: 'Account & Privacy' },
        { id: 'ownership', label: 'Brand & Ownership' },
        { id: 'support', label: 'Technical Support' }
    ];

    const faqData = {
        products: [
            { id: 'p1', question: 'What types of products does Prints Carts offer?', answer: 'We offer a wide selection of printers, ink cartridges, toner cartridges, photo paper, and everyday printing supplies for home and office needs. Our inventory includes both standard consumer models and high-performance commercial equipment.' },
            { id: 'p2', question: 'How do I know if a cartridge is compatible with my printer?', answer: 'Each product page includes detailed compatibility lists based on manufacturer data. You can find your printer model number on the front or top of your device. If you are still unsure, please contact our support team with your printer model before purchase.' },
            { id: 'p3', question: 'Are the printers wireless or mobile-printing ready?', answer: 'Most modern printers we carry include Wi-Fi and mobile-printing features (AirPrint, Mopria, etc.). Compatibility depends on the specific model. Please check the "Connectivity" section in the product specifications for details.' },
            { id: 'p4', question: 'What is page yield and why does it vary?', answer: 'Page yield is the estimated number of pages a cartridge can print based on 5% page coverage (industry standard). Actual results vary depending on document density, image coverage, and print settings (Draft vs. Best).' },
            { id: 'p5', question: 'Do you offer product recommendations?', answer: 'Absolutely. Our team is available to assist you in selecting the right printer based on your monthly volume, paper type requirements, and budget constraints.' }
        ],
        ordering: [
            { id: 'o1', question: 'How can I place an order?', answer: 'Simply browse our catalog, add items to your cart, and proceed to our secure checkout. You can checkout as a guest or create an account to track future orders.' },
            { id: 'o2', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and secure digital wallets. All transactions are encrypted and processed through industry-leading payment gateways.' },
            { id: 'o3', question: 'Can I modify or cancel my order?', answer: 'Orders can be modified or canceled as long as they haven\'t moved to the "Shipped" status. Due to our automated fulfillment, we recommend contacting us via email within 30 minutes of placement for any changes.' }
        ],
        shipping: [
            { id: 's1', question: 'Do you ship across the United States and Canada?', answer: 'Yes, we provide comprehensive shipping coverage to all US states and Canadian provinces. We utilize premium carriers to ensure safe and timely delivery of your printing equipment.' },
            { id: 's2', question: 'How long does delivery take?', answer: 'Standard processing takes 1-2 business days. Delivery timelines vary by destination but typically range from 3-7 business days for standard shipping. Expedited options are available at checkout.' },
            { id: 's3', question: 'How can I track my order?', answer: 'Once your order reaches our carrier, you will receive an automated shipping confirmation email containing your tracking number and a link to the carrier\'s tracking portal.' }
        ],
        returns: [
            { id: 'r1', question: 'What is your return policy?', answer: 'We offer a flexible return window for eligible items. Products must be in their original, unopened packaging to qualify. For full details, please visit our Refund & Return Policy page.' },
            { id: 'r2', question: 'How do I start a return?', answer: 'To initiate a return, please email support@printscarts.com with your order number. Our team will verify your eligibility and provide you with a Return Merchandise Authorization (RMA) number and instructions.' },
            { id: 'r3', question: 'When will I receive my refund?', answer: 'Refunds are initiated immediately after our warehouse inspects the returned items. It typically takes 5-10 business days for the credit to appear on your original payment statement.' }
        ],
        account: [
            { id: 'a1', question: 'Do I need an account to place an order?', answer: 'No, guest checkout is always available. However, creating an account allows you to track shipments, view your full order history, and receive exclusive offers on supplies.' },
            { id: 'a2', question: 'How is my personal information protected?', answer: 'We employ bank-level encryption and secure server infrastructure to protect your data. We do not sell or share your personal information with third-party advertisers.' }
        ],
        ownership: [
            { id: 'w1', question: 'Is Prints Carts affiliated with any printer brands?', answer: 'Prints Carts is a proudly independent online retailer. All trademarks, logos, and brand names (e.g., HP, Canon, Epson) belong to their respective owners and are used solely for identification and compatibility purposes.' },
            { id: 'w2', question: 'Do products come with a manufacturer warranty?', answer: 'Yes, most new printers and equipment carry the full original manufacturer warranty. Please keep your invoice/receipt for proof of purchase should you need warranty service from the brand.' }
        ],
        support: [
            { id: 'u1', question: 'What assistance do you provide?', answer: 'Our support team assists with:\n• Product compatibility inquiries\n• Shipping and tracking updates\n• Returns and refund authorization\n• Post-purchase equipment questions' },
            { id: 'u2', question: 'How can I contact customer support?', answer: 'You can reach us directly at support@printscarts.com. We aim to respond to all inquiries within 24 business hours. For urgent order issues, please visit our Contact Us page for the quickest channels.' }
        ]
    };

    const allFaqs = useMemo(() => {
        return Object.entries(faqData).flatMap(([category, items]) => 
            items.map(item => ({ ...item, category }))
        );
    }, [faqData]);

    const filteredFaqs = useMemo(() => {
        let items = allFaqs;
        
        // Filter by category if not 'all' and not searching
        if (activeCategory !== 'all' && !searchQuery) {
            items = items.filter(item => item.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            items = items.filter(item => 
                item.question.toLowerCase().includes(query) || 
                item.answer.toLowerCase().includes(query)
            );
        }

        return items;
    }, [allFaqs, activeCategory, searchQuery]);

    const toggleItem = (id) => {
        setOpenItemId(prev => prev === id ? null : id);
    };

    // Auto-select 'all' when searching
    useEffect(() => {
        if (searchQuery && activeCategory !== 'all') {
            setActiveCategory('all');
        }
    }, [searchQuery]);

    return (
        <div className="faqs-premium-wrapper">
            <main className="faqs-premium-container">
                <header className="faqs-header">
                    <h1>Frequently Asked <span style={{ color: '#0f3d91' }}>Questions</span></h1>
                    <p>Find answers to common questions about our products, shipping, returns, and corporate services.</p>
                </header>

                <div className="faqs-search-wrapper">
                    <div className="faqs-search-bar">
                        <svg className="faqs-search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            className="faqs-search-input"
                            placeholder="Search questions or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="faqs-clear-btn" onClick={() => setSearchQuery('')}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {!searchQuery && (
                    <nav className="faqs-categories">
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                className={`faq-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                )}

                <div className="faqs-list">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map(faq => (
                            <div key={faq.id} className={`faq-item ${openItemId === faq.id ? 'open' : ''}`}>
                                <button className="faq-trigger" onClick={() => toggleItem(faq.id)}>
                                    <span className="faq-question">{faq.question}</span>
                                    <span className="faq-icon-box">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div className="faq-answer-wrapper">
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="faqs-no-results">
                            <h3>No results found</h3>
                            <p>We couldn't find any answers matching "{searchQuery}". Try a different keyword or reach out to our team.</p>
                        </div>
                    )}
                </div>

                <div className="faqs-footer">
                    <h2>Still have questions?</h2>
                    <p>Our support team is standing by to assist with any further questions you may have.</p>
                    <Link href="/contact" className="faq-category-btn active" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
                        Contact Support
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default FAQs;
