import React from 'react';
import { MapPin, Mail, Globe, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import './ContactInfo.css';

const ContactInfo = () => {
    return (
        <div className="contact-info-container">
            {/* Mailing Address */}
            <div className="info-card">
                <div className="info-card-icon">
                    <MapPin size={24} />
                </div>
                <div className="info-card-content">
                    <h3>Mailing Address</h3>
                    <div className="address-details">
                        <p className="brand-name">Prints Carts</p>
                        <p>7181 Beacon Dr 15</p>
                        <p>Reno, NV 89506</p>
                        <p>United States</p>
                    </div>
                </div>
            </div>

            {/* Email Support */}
            <div className="info-card">
                <div className="info-card-icon">
                    <Mail size={24} />
                </div>
                <div className="info-card-content">
                    <h3>Email Support</h3>
                    <p className="description">For all inquiries, please contact us at:</p>
                    <a href="mailto:support@printscarts.com" className="contact-link email">
                        support@printscarts.com
                    </a>
                    <p className="sub-description">We aim to reply promptly during business hours.</p>
                </div>
            </div>

            {/* Website */}
            <div className="info-card">
                <div className="info-card-icon">
                    <Globe size={24} />
                </div>
                <div className="info-card-content">
                    <h3>Official Website</h3>
                    <a href="https://www.printscarts.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                        www.printscarts.com
                    </a>
                    <p className="description">
                        Browse our products, view compatibility details, or learn more about our services.
                    </p>
                </div>
            </div>

            {/* Help List */}
            <div className="info-card highlight-card">
                <div className="info-card-icon">
                    <MessageSquare size={24} />
                </div>
                <div className="info-card-content">
                    <h3>What We Can Help With</h3>
                    <p className="description">Our customer assistance team can support you with:</p>
                    <ul className="help-list-premium">
                        <li>
                            <CheckCircle2 size={16} className="list-icon" />
                            <span>Product inquiries and compatibility questions</span>
                        </li>
                        <li>
                            <CheckCircle2 size={16} className="list-icon" />
                            <span>Order updates and shipping status</span>
                        </li>
                        <li>
                            <CheckCircle2 size={16} className="list-icon" />
                            <span>Return and refund guidance</span>
                        </li>
                        <li>
                            <CheckCircle2 size={16} className="list-icon" />
                            <span>Basic questions about using our website and services</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Response Time */}
            <div className="info-card response-status-card">
                <div className="info-card-icon">
                    <Clock size={24} />
                </div>
                <div className="info-card-content">
                    <h3>Expected Response Time</h3>
                    <p>
                        Most messages receive a response within a reasonable timeframe during standard business hours. 
                        Response times may vary on weekends or holidays.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
