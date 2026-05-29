'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

const InkjetVsLaserGuide = () => {
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
            <span style={{ display: 'inline-block', background: '#0f3d91', color: '#ffffff', fontSize: '10px', fontWeight: '900', padding: '6px 16px', borderRadius: '4px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Buying Guide
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2', maxWidth: '800px', margin: '0 auto 24px' }}>
                Inkjet vs Laser Printers (2026 Buying Guide) — Which One Is Right for You?
            </h1>
            <div style={{ width: '60px', height: '4px', background: '#0a3382', margin: '0 auto 32px', borderRadius: '2px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '13px', fontWeight: '600', gap: '8px' }}>
              <span style={{ color: '#1e293b' }}>By PrintsCarts Team</span>
              <span>•</span>
              <span>February 11, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </header>

          {/* Main Content Centered */}
          <div style={{ color: '#475569', fontSize: '18px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            
            <p style={{ fontSize: '22px', color: '#334155', marginBottom: '40px', fontWeight: '500', lineHeight: '1.6' }}>
               Should you buy an inkjet printer or a laser printer? We break down the technical and financial differences to help you decide.
            </p>
            <p style={{ marginBottom: '24px' }}>
               This comprehensive comparison explores the core technologies, running costs, and use-case scenarios for both types of hardware in the modern 2026 market.
            </p>

            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginTop: '60px', marginBottom: '24px' }}>Summary Overview</h2>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #f1f5f9', marginBottom: '40px' }}>
              <ul style={{ paddingLeft: '24px', margin: 0, listStyleType: 'disc' }}>
                <li><strong>Inkjet:</strong> Best for photos, vibrant colors, and variable home tasks.</li>
                <li><strong>Laser:</strong> Best for high-speed text documents and office efficiency.</li>
                <li><strong>Running Costs:</strong> Laser is cheaper for black-and-white, but Inkjet Tanks dominate the value tier.</li>
              </ul>
            </div>

            <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <Link href="/printers" style={{ display: 'inline-block', background: '#0f3d91', color: '#ffffff', fontWeight: '900', padding: '16px 40px', borderRadius: '99px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(15,61,145,0.2)' }}>
                    Explore Our Collection
                </Link>
            </div>

          </div>
        </article>
      </div>

      
    </div>
  );
};

export default InkjetVsLaserGuide;


