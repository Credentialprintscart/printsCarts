'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

const PrinterSetupGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
      

      <div style={{ flexGrow: 1, paddingTop: '60px', paddingBottom: '100px' }}>
        <article style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          {/* Centered Breadcrumb */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <Link href="/blogs" style={{ fontSize: '13px', fontWeight: '900', color: '#64748b', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              &larr; Back to the journal
            </Link>
          </div>

          {/* Centered Article Header */}
          <header style={{ marginBottom: '60px', paddingBottom: '40px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#7c3aed', color: '#ffffff', fontSize: '10px', fontWeight: '900', padding: '6px 16px', borderRadius: '4px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Technical Guide
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2', maxWidth: '800px', margin: '0 auto 24px' }}>
                The Ultimate Guide to Setting Up a New Printer (Windows & macOS) — 2026 Edition
            </h1>
            <div style={{ width: '60px', height: '4px', background: '#0a3382', margin: '0 auto 32px', borderRadius: '2px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: '600', gap: '8px' }}>
              <span style={{ color: '#1e293b' }}>By PrintsCarts Team</span>
              <span>•</span>
              <span>February 11, 2026</span>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </header>

          <div style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontSize: '22px', color: '#334155', marginBottom: '40px', fontWeight: '500', lineHeight: '1.6' }}>
               Frustrated with printer setup? Follow our step-by-step guide for unboxing, driver installation, and troubleshooting common connection issues.
            </p>
            <p style={{ marginBottom: '40px' }}>
               In 2026, printer setup should be wireless and automatic. Our guide ensures you correctly configure your hub for seamless multi-device printing.
            </p>

            <div style={{ background: '#f5f3ff', padding: '32px', borderRadius: '16px', border: '1px solid #ddd6fe', marginBottom: '40px', color: '#5b21b6' }}>
              <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc' }}>
                <li>Unbox and remove all protective transit tapes.</li>
                <li>Download the latest official printer assistant software.</li>
                <li>Connect via WPA-3 secure Wi-Fi protocols.</li>
                <li>Configure Default Cloud Print for remote accessibility.</li>
              </ul>
            </div>

            <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <Link href="/contact" style={{ display: 'inline-block', background: '#0f3d91', color: '#ffffff', fontWeight: '900', padding: '16px 40px', borderRadius: '99px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(15,61,145,0.2)' }}>
                    Get Setup Assistance
                </Link>
            </div>
          </div>
        </article>
      </div>

      
    </div>
  );
};

export default PrinterSetupGuide;


