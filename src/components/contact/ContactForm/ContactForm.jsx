'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderNumber: '',
        subject: 'General Question',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const subjects = [
        'Product Inquiry',
        'Order Status',
        'Return Request',
        'General Question'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, formData);

            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                orderNumber: '',
                subject: 'General Question',
                message: ''
            });
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error(error);
            setSubmitError(error.response?.data?.message || "Failed to send message. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="success-box">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '16px' }}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. A team member will contact you shortly.</p>
                <button className="submit-button" onClick={() => setShowSuccess(false)} style={{ margin: '20px auto 0' }}>
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="contact-form-card">
            <div className="form-header">
                <h2>📩 Contact Form</h2>
                <p>If you prefer reaching out through our website, simply fill out the form below. A team member will contact you shortly.</p>
            </div>
            {submitError && (
                <div className="error-alert">
                    {submitError}
                </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form-grid">
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Your Phone Number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="orderNumber">Order Number (If Applicable)</label>
                    <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        placeholder="Enter Order ID"
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="subject">Subject*</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    >
                        {subjects.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="message">Message*</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here…"
                        required
                    />
                </div>

                <div className="full-width">
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
