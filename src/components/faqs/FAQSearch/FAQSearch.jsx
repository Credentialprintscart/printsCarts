import React from 'react';
import './FAQSearch.css';

const FAQSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
                <path d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 18L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export default FAQSearch;
