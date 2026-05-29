'use client';
import Link from 'next/link';

const CTA = () => {
  return (
    <>
      <section className="cta-section">
        <div className="cta-container">
          <h2>Shop with Peace of Mind</h2>
          <p className="cta-description">
            Whether you're printing school assignments, home documents, or business materials, Prints Carts makes it easy to find dependable printing essentials without complexity.
          </p>
          <p className="cta-subdescription">
            Browse our collections, explore detailed product information, and enjoy a smooth, transparent, and user-friendly shopping experience.
          </p>
          <div className="cta-buttons">
            <Link href="/printers" className="btn-primary">Browse Printers</Link>
            <Link href="/ink-toner" className="btn-outline">Shop Ink & Toner &gt;</Link>
          </div>
        </div>
      </section>

      <style>{`
        .cta-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #0f3d91, #0b2c66);
          color: #fff;
        }

        .cta-container {
          max-width: 1300px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-container h2 {
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: #fff;
        }

        .cta-description {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 16px 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-subdescription {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 40px 0;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #fff;
          color: #0f3d91;
          padding: 16px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
        }

        .btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
          padding: 16px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          transition: background 0.3s, transform 0.3s;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cta-container h2 {
            font-size: 32px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-outline {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default CTA;



