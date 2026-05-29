const ImportantNotice = () => {
  return (
    <>
      <section className="important-notice-section">
        <div className="notice-container">
          <h2>Important Notice</h2>
          <ul className="notice-list">
            <li>
              <strong>Product availability, pricing, and specifications may change without prior notice.</strong>
            </li>
            <li>
              <strong>Delivery times vary based on location, courier service, and product availability.</strong>
            </li>
            <li>
              <strong>Manufacturer warranties apply to eligible products as provided by their respective brands.</strong>
            </li>
            <li>
              <strong>Prints Carts provides retail services independently and does not represent or act as an authorized dealer of any manufacturer.</strong>
            </li>
          </ul>
        </div>
      </section>

      <style>{`
        .important-notice-section {
          padding: 60px 20px;
          background: #f8f9fa;
        }

        .notice-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .notice-container h2 {
          font-size: 32px;
          font-weight: 700;
          color: #0f3d91;
          margin: 0 0 32px 0;
          text-align: center;
        }

        .notice-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .notice-list li {
          padding: 20px 24px;
          background: #fff;
          border-left: 4px solid #0f3d91;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .notice-list li:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .notice-list li strong {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .notice-container h2 {
            font-size: 24px;
          }

          .notice-list li {
            padding: 16px 20px;
          }

          .notice-list li strong {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default ImportantNotice;

