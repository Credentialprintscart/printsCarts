'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './LiveChat.css';

const LiveChat = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! 👋 How can we help you with your return or refund today?",
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const inputRef = useRef(null);

    // Hidden pages list
    const hiddenPages = ['/refund-return-policy', '/return-exchange-policy'];

    useEffect(() => {
        const openHandler = () => setIsOpen(true);
        window.addEventListener('open-live-chat', openHandler);
        return () => window.removeEventListener('open-live-chat', openHandler);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (hiddenPages.includes(pathname)) {
        return null;
    }

    const toggleChat = () => {
        setIsOpen(!isOpen);
    }; 

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');

        // Simulate agent response
        setTimeout(() => {
            const agentResponse = {
                id: messages.length + 2,
                text: "Thank you for your message! A support agent will respond shortly. For immediate assistance, please call us at 1-800-PRINTS.",
                sender: 'agent',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1500);
    };

    const quickActions = [
        { id: 1, text: "Start a return", icon: "↩️" },
        { id: 2, text: "Check refund status", icon: "💰" },
        { id: 3, text: "Speak to agent", icon: "👤" }
    ];

    const handleQuickAction = (action) => {
        const newMessage = {
            id: messages.length + 1,
            text: action.text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);

        setTimeout(() => {
            const agentResponse = {
                id: messages.length + 2,
                text: `I can help you with "${action.text}". Please provide your order number to get started.`,
                sender: 'agent',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1000);
    };

    return (
        <div className="live-chat-container">
            {/* Chat Button */}
            <button
                className={`live-chat-button ${isOpen ? 'active' : ''}`}
                onClick={toggleChat}
                aria-label="Toggle live chat"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                    </svg>
                )}
                {!isOpen && <span className="live-chat-badge">Live</span>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="live-chat-window">
                    {/* Header */}
                    <div className="live-chat-header">
                        <div className="live-chat-header-info">
                            <div className="live-chat-avatar">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                            </div>
                            <div>
                                <h3>Returns Support</h3>
                                <p className="live-chat-status">
                                    <span className="status-dot"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button className="live-chat-close" onClick={toggleChat} aria-label="Close chat">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="live-chat-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'agent-message'}`}
                            >
                                <div className="message-content">
                                    <p>{message.text}</p>
                                    <span className="message-time">{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="live-chat-quick-actions">
                        {quickActions.map((action) => (
                            <button
                                key={action.id}
                                className="quick-action-btn"
                                onClick={() => handleQuickAction(action)}
                            >
                                <span>{action.icon}</span>
                                {action.text}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form className="live-chat-input-container" onSubmit={handleSendMessage}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="live-chat-input"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            aria-label="Chat message input"
                        />
                        <button
                            type="submit"
                            className="live-chat-send"
                            aria-label="Send message"
                            disabled={inputMessage.trim() === ''}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="live-chat-footer">
                        <p>Powered by TechnoSky Support</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveChat;

