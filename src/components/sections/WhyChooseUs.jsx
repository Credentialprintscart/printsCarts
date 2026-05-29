const WhyChooseUs = () => {
  const reasons = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10L24 18H32L26 24L28 32L20 26L12 32L14 24L8 18H16L20 10Z" fill="#10b981"/>
        </svg>
      ),
      title: "Clear, Accurate Product Information",
      description: "Each product listing includes detailed descriptions, compatibility information, and specifications so you can choose the right item without confusion."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="16" r="4" stroke="#10b981" strokeWidth="2" fill="none"/>
          <path d="M12 28C12 24 16 22 20 22C24 22 28 24 28 28" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 12V10" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 22V20" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Customer-Centered Experience",
      description: "We offer responsive assistance for product inquiries, order updates, and general questions—ensuring your shopping experience remains smooth and worry-free."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="14" width="24" height="16" rx="2" stroke="#10b981" strokeWidth="2" fill="none"/>
          <path d="M12 18H28" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 22H24" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="26" r="2" fill="#10b981"/>
        </svg>
      ),
      title: "Fast & Dependable Shipping",
      description: "We work with trusted carriers to ensure safe and timely delivery across the United States and Canada. Delivery times may vary based on location and availability."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="12" width="8" height="8" rx="1" stroke="#10b981" strokeWidth="2" fill="none"/>
          <rect x="22" y="12" width="8" height="8" rx="1" stroke="#10b981" strokeWidth="2" fill="none"/>
          <rect x="10" y="22" width="8" height="8" rx="1" stroke="#10b981" strokeWidth="2" fill="none"/>
          <rect x="22" y="22" width="8" height="8" rx="1" stroke="#10b981" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: "Wide Selection for Every Need",
      description: "From compact home printers to office-ready devices, and from ink cartridges to everyday printing supplies, Prints Carts offers a broad range of options to meet different printing requirements."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 16C20 14.8954 20.8954 14 22 14H26C27.1046 14 28 14.8954 28 16V20C28 21.1046 27.1046 22 26 22H22C20.8954 22 20 21.1046 20 20V16Z" stroke="#10b981" strokeWidth="2" fill="none"/>
          <path d="M12 20C12 18.8954 12.8954 18 14 18H18C19.1046 18 20 18.8954 20 20V24C20 25.1046 19.1046 26 18 26H14C12.8954 26 12 25.1046 12 24V20Z" stroke="#10b981" strokeWidth="2" fill="none"/>
          <path d="M20 24C20 22.8954 20.8954 22 22 22H26C27.1046 22 28 22.8954 28 24V28C28 29.1046 27.1046 30 26 30H22C20.8954 30 20 29.1046 20 28V24Z" stroke="#10b981" strokeWidth="2" fill="none"/>
        </svg>
      ),
      title: "Secure Online Shopping",
      description: "We use secure checkout processes and industry-standard practices to help protect your personal information."
    }
  ];

  return (
    <>
      <section className="why-choose-us">
        <div className="why-choose-container">
          <h2>Why Shop with Prints Carts?</h2>
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
                <div className="checkmark">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" fill="#10b981"/>
                    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .why-choose-us {
          padding: 80px 20px;
          background: #fff;
        }

        .why-choose-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .why-choose-container h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f3d91;
          text-align: center;
          margin: 0 0 60px 0;
        }

        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .reason-card {
          background: #f8f9fa;
          padding: 32px 24px;
          border-radius: 12px;
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .reason-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .reason-icon {
          display: flex;
          margin-bottom: 20px;
        }

        .reason-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px 0;
        }

        .reason-card p {
          font-size: 15px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .checkmark {
          position: absolute;
          top: 16px;
          right: 16px;
        }

        @media (max-width: 768px) {
          .reasons-grid {
            grid-template-columns: 1fr;
          }

          .why-choose-container h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default WhyChooseUs;


