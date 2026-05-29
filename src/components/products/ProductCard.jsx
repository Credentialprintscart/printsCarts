'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
const printerImg = "/PrintsCartslogo.png"; // Fallback
import { Eye, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${product.slug || product._id}`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product.slug || product._id, 1));
    router.push('/cart?redirect=shipping');
  };

  const imageUrl = product.image 
    ? (product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}${product.image}`)
    : (product.images && product.images.length > 0 
        ? (product.images[0].startsWith('http') ? product.images[0] : `${process.env.NEXT_PUBLIC_API_URL.replace('/api', '')}${product.images[0]}`) 
        : printerImg);

  const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product._id}`} className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.title || product.name} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
          className="product-image"
        />
      </Link>
      
      <div className="product-info">
        <div className="product-category">
            {product.category?.name || product.category || 'Printer'}
        </div>
        <Link href={`/product/${product.slug || product._id}`} className="product-title" title={product.title || product.name}>
          {product.title || product.name}
        </Link>
        <div className="product-price">
           ${price}
        </div>

        <div className="product-card-buttons">
            <button className="card-btn details-btn" onClick={handleDetails}>
                <Eye size={14} />
                Details
            </button>
            <button className="card-btn buy-btn" onClick={handleBuyNow}>
                <ShoppingBag size={14} />
                Buy Now
            </button>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .product-image-container {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          background: #f9fafb;
          overflow: hidden;
          display: block;
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 20px;
          transition: transform 0.3s;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-info {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-category {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .product-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-decoration: none;
        }
        .product-title:hover {
          color: #0f3d91;
        }
        .product-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: auto;
          margin-bottom: 12px;
        }
        .product-card-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 8px;
        }
        .card-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 10px 0;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            border: none;
            text-transform: uppercase;
        }
        .details-btn {
            background: #fff;
            color: #475569;
            border: 1px solid #e2e8f0;
        }
        .details-btn:hover {
            border-color: #cbd5e1;
            background: #f8fafc;
            color: #0f172a;
        }
        .buy-btn {
            background: #0f3d91;
            color: white;
            box-shadow: 0 2px 4px -1px rgba(15, 61, 145, 0.1);
        }
        .buy-btn:hover {
            background: #0a2a66;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(15, 61, 145, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;

