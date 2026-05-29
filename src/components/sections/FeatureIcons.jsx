const FeatureIcons = () => {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M24 12L28 20H36L29 26L32 34L24 28L16 34L19 26L12 20H20L24 12Z" fill="#0f3d91"/>
        </svg>
      ),
      title: "Genuine-Quality Products",
      description: "We ensure all products meet the highest quality standards"
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M24 14C18.48 14 14 18.48 14 24C14 29.52 18.48 34 24 34C29.52 34 34 29.52 34 24C34 18.48 29.52 14 24 14ZM24 30C20.69 30 18 27.31 18 24C18 20.69 20.69 18 24 18C27.31 18 30 20.69 30 24C30 27.31 27.31 30 24 30Z" fill="#0f3d91"/>
          <path d="M24 20C23.45 20 23 20.45 23 21V23C23 23.55 23.45 24 24 24C24.55 24 25 23.55 25 23V21C25 20.45 24.55 20 24 20Z" fill="#0f3d91"/>
          <path d="M24 25C23.45 25 23 25.45 23 26V27C23 27.55 23.45 28 24 28C24.55 28 25 27.55 25 27V26C25 25.45 24.55 25 24 25Z" fill="#0f3d91"/>
        </svg>
      ),
      title: "Clear Compatibility Info",
      description: "Easy-to-understand compatibility information for all products"
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M24 16C20.69 16 18 18.69 18 22V26C18 29.31 20.69 32 24 32C27.31 32 30 29.31 30 26V22C30 18.69 27.31 16 24 16ZM28 26C28 27.1 27.1 28 26 28H22C20.9 28 20 27.1 20 26V22C20 20.9 20.9 20 22 20H26C27.1 20 28 20.9 28 22V26Z" fill="#0f3d91"/>
          <path d="M24 18C24.55 18 25 18.45 25 19V21C25 21.55 24.55 22 24 22C23.45 22 23 21.55 23 21V19C23 18.45 23.45 18 24 18Z" fill="#0f3d91"/>
        </svg>
      ),
      title: "Secure Checkout",
      description: "Your payment information is always protected and secure"
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M16 20H32V22H16V20Z" fill="#0f3d91"/>
          <path d="M16 24H28V26H16V24Z" fill="#0f3d91"/>
          <path d="M20 28H32V30H20V28Z" fill="#0f3d91"/>
          <path d="M14 16H34C35.1 16 36 16.9 36 18V32C36 33.1 35.1 34 34 34H14C12.9 34 12 33.1 12 32V18C12 16.9 12.9 16 14 16Z" stroke="#0f3d91" strokeWidth="2" fill="none"/>
          <circle cx="20" cy="30" r="2" fill="#0f3d91"/>
        </svg>
      ),
      title: "Fast Shipping US & Canada",
      description: "Quick and reliable delivery to your doorstep"
    }
  ];

  return (
    <>
      <section className="feature-icons">
        <div className="feature-icons-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .feature-icons {
          padding: 60px 20px;
          background: #fff;
        }

        .feature-icons-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
        }

        .feature-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 12px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .feature-card p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .feature-icons-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default FeatureIcons;


