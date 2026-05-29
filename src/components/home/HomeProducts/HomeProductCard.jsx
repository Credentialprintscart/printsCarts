'use client';
import React from 'react';
import Link from 'next/link';
import { Eye, ShoppingBag } from 'lucide-react';
import './HomeProductCard.css';

const HomeProductCard = ({ product, handleDetails, handleBuyNow }) => {
    const optimizeCloudinaryUrl = (url) => {
        if (!url || !url.includes('cloudinary.com')) return url;
        // Add dynamic resizing (w_400,c_limit), auto quality (q_auto), and auto format (f_auto)
        return url.replace('/upload/', '/upload/w_400,c_limit,q_auto,f_auto/');
    };

    const imageUrl = product.image || (product.images && product.images[0]) || '/PrintsCartslogo.png';
    let finalImageUrl = imageUrl.startsWith('http') 
        ? optimizeCloudinaryUrl(imageUrl) 
        : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || ''}${imageUrl}`;

    return (
        <div className="custom-product-card">
            <Link href={`/product/${product.slug || product._id}`} className="card-image-wrapper">
                <img 
                    src={finalImageUrl} 
                    alt={product.title || product.name} 
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+Image'; }}
                />
                {product.countInStock === 0 && (
                    <div className="out-of-stock-badge">
                        Out of Stock
                    </div>
                )}
            </Link>
            <div className="card-content">
                <div className="brand-tag">{product.brand || 'Printer'}</div>
                <h3 className="product-title-link">
                    <Link href={`/product/${product.slug || product._id}`}>
                        {product.title || product.name}
                    </Link>
                </h3>
                <div className="price-container">
                    <span className="current-price">${product.price?.toFixed(2)}</span>
                    {(product.oldPrice > 0 || product.originalPrice > 0) && (
                        <span className="old-price">
                            ${(product.oldPrice || product.originalPrice)?.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className="card-actions">
                    <button className="details-btn-custom" onClick={(e) => handleDetails(e, product)}>
                        <Eye size={16} /> Details
                    </button>
                    <button className="buy-btn-custom" onClick={(e) => handleBuyNow(e, product)}>
                        <ShoppingBag size={16} /> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeProductCard;
