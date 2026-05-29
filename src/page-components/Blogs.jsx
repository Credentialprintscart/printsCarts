'use client';
import React from 'react';
import Link from 'next/link';

const top10 = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80&fm=webp";
const inkjetvstoner = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fm=webp";
const moneysave = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fm=webp";
const ultimateguide = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80&fm=webp";
const printerisoffline = "https://images.unsplash.com/photo-1591405351990-4726e33df58d?w=800&q=80&fm=webp";
const ecofriendly = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fm=webp";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Home Printers in 2026 — Best Picks for Students, Families & Remote Workers",
      excerpt: "Choosing the best home printer in 2026 has become more important than ever. Find out our top picks across different categories.",
      date: "February 11, 2026",
      slug: "top-10-home-printers-2026",
      category: "Buying Guide",
      image: top10
    },
     {
      id: 2,
      title: "Inkjet vs Laser Printers (2026 Buying Guide) — Which One Is Right for You?",
      excerpt: "Should you buy an inkjet printer or a laser printer? We break down the technical and financial differences to help you decide.",
      date: "February 11, 2026",
      slug: "inkjet-vs-laser-printers-2026",
      category: "Buying Guide",
      image: inkjetvstoner
    },
     {
      id: 3,
      title: "How to Save Money on Ink & Toner — Smart Printing Tips Every User Should Know (2026 Guide)",
      excerpt: "Ink costs can be frustrating. Learn instant ways to reduce printing costs, optimize settings, and save 30-60% per year.",
      date: "February 11, 2026",
      slug: "save-money-on-ink-toner-2026",
      category: "Cost Saving Tips",
      image: moneysave
    },
    {
      id: 4,
      title: "The Ultimate Guide to Setting Up a New Printer (Windows & macOS) — 2026 Edition",
      excerpt: "Frustrated with printer setup? Follow our step-by-step guide for unboxing, driver installation, and troubleshooting common connection issues.",
      date: "February 11, 2026",
      slug: "printer-setup-guide-2026",
      category: "Technical Guide",
      image: ultimateguide
    },
    {
      id: 5,
      title: "Why Your Printer Is Offline — 7 Quick Fixes You Can Try at Home (2026 Guide)",
      excerpt: "Is your printer refusing to connect? We break down 7 quick and effective fixes to get your printer back online in minutes.",
      date: "February 11, 2026",
      slug: "printer-offline-fix-guide-2026",
      category: "Troubleshooting",
      image: printerisoffline
    },
    {
      id: 6,
      title: "Eco-Friendly Printing — How to Reduce Waste & Extend Printer Life (2026 Sustainability Guide)",
      excerpt: "Eco-friendly printing saves money and protects the environment. Learn how to print sustainably in 2026.",
      date: "February 11, 2026",
      slug: "eco-friendly-printing-guide-2026",
      category: "Sustainability",
      image: ecofriendly
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
      
      
      <div style={{ flexGrow: 1 }}>
        {/* Centered Professional Header */}
        <div style={{ background: '#ffffff', padding: '80px 20px 40px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>The Print Journal</h1>
            <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '700px', margin: '0 auto', fontWeight: '500' }}>
               Your complete source for professional printing tips, expert reviews, and the latest industry insights.
            </p>
          </div>
        </div>

        {/* Centered Blog Directory */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px 100px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {blogs.map((blog) => (
              <div key={blog.id} style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <Link href={`/blogs/${blog.slug}`} style={{ display: 'block', overflow: 'hidden' }}>
                    <div style={{ height: '240px', overflow: 'hidden' }}>
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                        />
                    </div>
                </Link>
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
                    <span style={{ background: '#f1f5f9', color: '#0f3d91', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {blog.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{blog.date}</span>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', marginBottom: '16px', lineHeight: '1.3' }}>
                    <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{blog.title}</Link>
                  </h2>
                  <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '15px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.excerpt}
                  </p>
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    style={{ fontSize: '14px', fontWeight: '900', color: '#0f3d91', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Dive Deeper <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Blogs;


