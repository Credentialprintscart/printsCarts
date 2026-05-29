import React from 'react';
import './ReturnAssistance.css';

const ReturnAssistance = () => {

    const handleLiveChat = () => {
        // Try to open the internal React LiveChat component
        try {
            window.dispatchEvent(new CustomEvent('open-live-chat'));
        } catch (e) {
            // ignore if CustomEvent is not supported
        }

        // If Tawk.to is available, maximize its widget as well
        if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
            window.Tawk_API.maximize();
            return;
        }

        // Fallback notice if neither is available
        setTimeout(() => {
            alert("Live chat is loading. Please try again in a moment.");
        }, 300);
    };

    return (
        <section className="return-assistance">
            <div className="assistance-card">
                <h2>Need Assistance?</h2>

                <div className="assistance-links">
                    {/* Email */}
                    <a href="mailto:support@printscarts.com" className="assistance-item">
                        <div className="assistance-icon">
                            📧
                        </div>
                        <div className="assistance-text">
                            <h3>Email Support</h3>
                            <p>support@printscarts.com</p>
                        </div>
                    </a>

                    {/* Live Chat */}
                    <div
                        className="assistance-item"
                        onClick={handleLiveChat}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="assistance-icon">
                            💬
                        </div>
                        <div className="assistance-text">
                            <h3>Live Chat</h3>
                            <p>Chat with us now</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnAssistance;
