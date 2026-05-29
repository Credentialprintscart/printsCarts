const AboutSection = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>About Prints Carts</h2>
            <h3>Your Trusted Online Destination for Printing Essentials</h3>
            <p>
              Prints Carts is an independent online retail platform offering a broad range of printers, genuine-quality ink and toner cartridges, and essential printing supplies. We focus on accuracy, transparency, and customer satisfaction—helping you choose the right products with confidence.
            </p>
            <p>
              Our goal is to make everyday printing easier for homes, small offices, students, and businesses. Whether you're upgrading your printer or restocking supplies, we provide a straightforward shopping experience designed around clarity, trust, and convenience.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
              alt="Modern printer setup"
            />
          </div>
        </div>
      </section>

      <style>{`
        .about-section {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .about-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-content h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f3d91;
          margin: 0 0 12px 0;
        }

        .about-content h3 {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .principles {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .principles span {
          font-size: 16px;
          font-weight: 600;
          color: #0f3d91;
          padding: 8px 16px;
          background: #e0f2fe;
          border-radius: 6px;
        }

        .about-content p {
          font-size: 16px;
          line-height: 1.8;
          color: #666;
          margin: 0 0 32px 0;
        }

        .btn-primary {
          background: #0f3d91;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .btn-primary:hover {
          background: #0b2c66;
          transform: translateY(-2px);
        }

        .about-image {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .about-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 968px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-content h2 {
            font-size: 28px;
          }

          .about-content h3 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default AboutSection;


