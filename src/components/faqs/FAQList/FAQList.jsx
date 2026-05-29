import React from 'react';
import './FAQList.css';

const FAQList = ({ faqs, openItems, toggleItem }) => {
    if (faqs.length === 0) {
        return (
            <div className="no-results">
                <p>No FAQs found matching your search.</p>
            </div>
        );
    }

    return (
        <div className="faqs-list">
            {faqs.map((faq) => (
                <div
                    key={faq.id}
                    className={`faq-item ${openItems[faq.id] ? 'open' : ''}`}
                    onClick={() => toggleItem(faq.id)}
                >
                    <div className="faq-question">
                        <span>{faq.question}</span>
                        <svg
                            className="faq-arrow"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="faq-answer">
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQList;
