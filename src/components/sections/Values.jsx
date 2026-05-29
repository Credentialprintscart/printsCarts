const Values = () => {
  const values = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M24 12L28 20H36L29 26L32 34L24 28L16 34L19 26L12 20H20L24 12Z" fill="#10b981"/>
        </svg>
      ),
      title: "Reliability",
      description: "We ensure reliable products and services."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <rect x="12" y="14" width="24" height="20" rx="2" stroke="#0f3d91" strokeWidth="2" fill="none"/>
          <path d="M16 18H32" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 22H28" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 26H32" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Transparency",
      description: "We are transparent in our dealings and information."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <path d="M24 16C20.69 16 18 18.69 18 22V26C18 29.31 20.69 32 24 32C27.31 32 30 29.31 30 26V22C30 18.69 27.31 16 24 16Z" fill="#10b981"/>
          <path d="M24 18C25.1 18 26 18.9 26 20V22C26 23.1 25.1 24 24 24C22.9 24 22 23.1 22 22V20C22 18.9 22.9 18 24 18Z" fill="white"/>
        </svg>
      ),
      title: "Customer Care",
      description: "Our customer care is always ready to assist you."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="8" fill="#e0f2fe"/>
          <rect x="12" y="14" width="24" height="20" rx="2" stroke="#0f3d91" strokeWidth="2" fill="none"/>
          <path d="M16 18H20" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 22H24" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 26H28" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 30H22" stroke="#0f3d91" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Independence",
      description: "We are an independent source for printing essentials."
    }
  ];

  return (
    <>
      <section className="values-section">
        <div className="values-container">
          <h2>Our Commitment & Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .values-section {
          padding: 80px 20px;
          background: #fff;
        }

        .values-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .values-container h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f3d91;
          text-align: center;
          margin: 0 0 60px 0;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .value-card {
          background: #f8f9fa;
          padding: 40px 24px;
          border-radius: 12px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .value-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .value-card p {
          font-size: 15px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr;
          }

          .values-container h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default Values;


