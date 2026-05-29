'use client';
import React from 'react';
import './ReturnGuidelines.css';

const ReturnGuidelines = () => {
    return (
        <section className="return-guidelines">
            <div className="guidelines-container">
                <h2>Return Guidelines</h2>
                <div className="guidelines-grid">
                    <div className="guidelines-card">
                        <h3>Eligible Items</h3>
                        <ul className="guidelines-list eligible">
                            <li>Unopened printers, ink, toner, accessories, and paper products</li>
                            <li>Defective items (even if opened), following inspection and approval</li>
                        </ul>
                    </div>

                    <div className="guidelines-card">
                        <h3>Non-Returnable Items</h3>
                        <ul className="guidelines-list non-returnable">
                            <li>Used or partially used cartridges (unless defective)</li>
                            <li>Digital or downloadable items</li>
                            <li>Custom or special-order products</li>
                            <li>Items not in original packaging</li>
                        </ul>
                    </div>

                    <div className="guidelines-card full-width">
                        <h3>Packaging Requirements</h3>
                        <div className="packaging-info">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                            <p>Must include the original box, manuals, cables, and all accessories. Items must be securely packed to prevent shipping damage.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnGuidelines;

