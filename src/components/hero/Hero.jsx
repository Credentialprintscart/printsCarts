import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Print Smart. Choose Better. Shop with Confidence.
            </h1>
            <p>
              Find reliable printers, ink, toner, and printing essentials for home and office needs. At Prints Carts, we make it simple to explore genuine-quality products with clear information, smooth browsing, and a customer-first shopping experience.
            </p>

            <div className="hero-actions">
              <Link href="/printers" className="btn primary">Shop Now</Link>
              <Link href="/printers" className="btn outline">Browse Printers</Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
              alt="Modern printer setup"
            />
          </div>
        </div>
      </section>

      <style>{`
        .hero {
          padding-top: 40px;
          position: relative;
          color: #fff;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(15, 61, 145, 0.95), rgba(11, 44, 102, 0.95)),
                      url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920') center/cover;
          background-blend-mode: overlay;
          filter: blur(2px);
          z-index: -1;
        }

        .hero-content {
          max-width: 1300px;
          margin: 0 auto;
          padding: 80px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 1;
        }

        .hero-text h1 {
          font-size: 52px;
          line-height: 1.2;
          font-weight: 700;
          margin: 0 0 24px 0;
        }

        .hero-text p {
          margin: 0 0 32px 0;
          font-size: 20px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 16px;
          display: inline-block;
        }

        .btn.primary {
          background: #fff;
          color: #0f3d91;
        }

        .btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
        }

        .btn.outline {
          border: 2px solid #fff;
          color: #fff;
          background: transparent;
        }

        .btn.outline:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .hero-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .hero-image img {
          width: 100%;
          height: auto;
          display: block;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }

          .hero-text h1 {
            font-size: 36px;
          }

          .hero-text p {
            font-size: 18px;
          }

          .hero-actions {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;

