'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

const EcoFriendlyPrintingGuide = () => {
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
            <span style={{ display: 'inline-block', background: '#0d9488', color: '#ffffff', fontSize: '10px', fontWeight: '900', padding: '6px 16px', borderRadius: '4px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Sustainability
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2', maxWidth: '800px', margin: '0 auto 24px' }}>
                Eco-Friendly Printing — How to Reduce Waste & Extend Printer Life (2026 Sustainability Guide)
            </h1>
            <div style={{ width: '60px', height: '4px', background: '#0a3382', margin: '0 auto 32px', borderRadius: '2px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: '600', gap: '8px' }}>
              <span style={{ color: '#1e293b' }}>By PrintsCarts Team</span>
              <span>•</span>
              <span>February 11, 2026</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
          </header>

          <div style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontSize: '22px', color: '#334155', marginBottom: '40px', fontWeight: '500', lineHeight: '1.6' }}>
               Eco-friendly printing saves money and protects the environment. Learn how to print sustainably in 2026.
            </p>
            <p style={{ marginBottom: '40px' }}>
               Sustainable printing is a combination of modern hardware and smart habits. Our 2026 guide shows you how to reduce your carbon footprint without sacrificing quality.
            </p>

            <div style={{ background: '#f0fdfa', padding: '32px', borderRadius: '16px', border: '1px solid #ccfbf1', marginBottom: '40px', color: '#0f766e' }}>
              <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc' }}>
                <li>Recycle empty cartridges through official manufacturer programs.</li>
                <li>Choose "Draft" mode and "Duplex" printing by default.</li>
                <li>Utilize FSC-certified sustainable paper sources.</li>
                <li>Switch to Energy Star rated printers to reduce idle power consumption.</li>
              </ul>
            </div>

            <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <Link href="/about" style={{ display: 'inline-block', background: '#0f3d91', color: '#ffffff', fontWeight: '900', padding: '16px 40px', borderRadius: '99px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(15,61,145,0.2)' }}>
                    Learn About Our Values
                </Link>
            </div>
          </div>
        </article>
      </div>

      
    </div>
  );
};

export default EcoFriendlyPrintingGuide;


