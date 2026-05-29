const LeftSidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <h3>Special Offers</h3>

        <div className="offer-card">
          <img src="https://i.imgur.com/2nCt3Sbl.jpg" alt="HP Printer" />
          <p>HP LaserJet Pro</p>
          <span>Special Deal</span>
        </div>

        <h3>Categories</h3>
        <ul>
          <li>All-in-One</li>
          <li>Laser Printers</li>
          <li>Inkjet Printers</li>
          <li>Large Format</li>
          <li>Ink & Toner</li>
        </ul>
      </aside>

      <style>{`
        .sidebar {
          background: #f8fafc;
          border-radius: 14px;
          padding: 20px;
          animation: slideIn 0.6s ease;
        }

        .sidebar h3 {
          margin-bottom: 12px;
        }

        .offer-card {
          background: #fff;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 20px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }

        .offer-card img {
          width: 100%;
          border-radius: 10px;
        }

        .offer-card span {
          color: #16a34a;
          font-weight: 600;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        li:hover {
          background: #e0f2fe;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default LeftSidebar;
