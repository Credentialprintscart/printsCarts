'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import './Footer.css';
const logo = "/PrintsCartslogo.png";

const Footer = () => {
  const [trackId, setTrackId] = useState('');
  const router = useRouter();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackId.trim()) {
      router.push(`/track-order?id=${trackId.trim()}`);
      setTrackId('');
    }
  };

  return (
    <footer className="footer-enhanced">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info - Left Column */}
          <div className="footer-section company-info">
            <Link href="/" className="footer-logo-box">
               <img 
                 src={logo} 
                 alt="PrintsCarts" 
                 className="footer-logo-img" 
                 width="120" 
                 height="100" 
                 decoding="async" 
               />
            </Link>
            <p className="footer-description">
              Your trusted source for printers, ink, toner, and printing supplies.
              We're committed to providing quality products with transparent service.
            </p>
            
            {/* Track Order Widget Below Description */}
            <div className="footer-track-widget">
              <h4 className="track-title">Track Your Order</h4>
              <form onSubmit={handleTrackSubmit} className="track-form">
                <input 
                  type="text" 
                  placeholder="Enter Order ID" 
                  className="track-input"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                />
                <button type="submit" className="track-btn" aria-label="Track Order">
                  <FiSearch />
                </button>
              </form>
            </div>

            <p className="footer-copyright-text">
              &copy; {new Date().getFullYear()} Prints Carts. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/printers">Shop Printers</Link></li>
              <li><Link href="/ink-toner">Ink & Toner</Link></li>
              <li><Link href="/track-order">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h4 className="footer-section-title">Policies</h4>
            <ul className="footer-links">
              <li><Link href="/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/refund-return-policy">Refund & Return Policy</Link></li>
              <li><Link href="/return-exchange-policy">Return & Exchange Policy</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/legal">Legal Information</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
              <li><Link href="/do-not-sell">Do Not Sell</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>Made with care for our customers | Independent Retailer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
