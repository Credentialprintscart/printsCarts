import Link from 'next/link';

import i1 from '@/assets/i1.jpg';
import i2 from '@/assets/i2.jpg';
import i3 from '@/assets/i3.jpg';

const ShopByCategory = () => {
  const categories = [
    {
      image: i1,
      title: "Printers",
      link: "/printers"
    },
    {
      image: i3,
      title: "Ink Cartridges",
      link: "/ink-toner"
    },
    {
      image: i2,
      title: "Toner & Supplies",
      link: "/ink-toner"
    }
  ];

  return (
    <>
      <section className="shop-by-category">
        <div className="category-container">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image.src || category.image} alt={category.title} />
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <Link href={category.link} className="category-btn">Shop Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .shop-by-category {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .category-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .category-container h2 {
          font-size: 36px;
          font-weight: 700;
          color: #0f3d91;
          text-align: center;
          margin: 0 0 60px 0;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .category-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .category-image {
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .category-card:hover .category-image img {
          transform: scale(1.05);
        }

        .category-content {
          padding: 24px;
          text-align: center;
        }

        .category-content h3 {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .category-btn {
          display: inline-block;
          background: #0f3d91;
          color: #fff;
          padding: 12px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s, transform 0.3s;
        }

        .category-btn:hover {
          background: #0b2c66;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: 1fr;
          }

          .category-container h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default ShopByCategory;



