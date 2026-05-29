'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // Fetch products on mount
    dispatch(listProducts('', '', 1)); // keyword, category, pageNumber
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-grid">
         <div className="spinner"></div>
         <p>Loading products...</p>
         <style>{`
            .loading-grid { text-align: center; padding: 40px; width: 100%; display: flex; flex-direction: column; align-items: center; }
            .spinner { width: 30px; height: 30px; border: 3px solid #eee; border-top: 3px solid #0f3d91; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 10px; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
         `}</style>
      </div>
    );
  }

  if (error) {
     return <div className="error-grid">Error: {error}</div>;
  }

  // Ensure products is an array
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="grid">
      {safeProducts.map(p => (
        <ProductCard key={p._id || p.id} product={p} />
      ))}
      <style>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          padding: 24px 0;
        }
        .error-grid {
           padding: 40px;
           text-align: center;
           color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;

