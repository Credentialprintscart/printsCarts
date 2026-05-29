const Commitment = () => {
  return (
    <>
      <section className="commitment-section">
        <div className="commitment-container">
          <h2>Our Commitment to You</h2>
          <p className="commitment-intro">
            At Prints Carts, we believe in honest communication, transparent product listings, and human-friendly customer service. We aim to provide a helpful experience where customers feel informed, supported, and confident in their purchases.
          </p>
          <p>
            We continuously improve our platform to make browsing, comparing, and purchasing printing essentials more convenient.
          </p>
        </div>
      </section>

      <style>{`
        .commitment-section {
          padding: 80px 20px;
          background: #fff;
        }

        .commitment-container {
          max-width: 1300px;
          margin: 0 auto;
          text-align: center;
        }

        .commitment-container h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f3d91;
          margin: 0 0 32px 0;
        }

        .commitment-intro {
          font-size: 18px;
          line-height: 1.8;
          color: #333;
          margin: 0 0 24px 0;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .commitment-container p:last-child {
          font-size: 16px;
          line-height: 1.8;
          color: #666;
          margin: 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .commitment-container h2 {
            font-size: 28px;
          }

          .commitment-intro {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default Commitment;

