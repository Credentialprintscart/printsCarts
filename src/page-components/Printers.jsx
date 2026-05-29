'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';
import HomeProductCard from '../components/home/HomeProducts/HomeProductCard';
import '../styles/pages.css';

const Printers = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const searchParams = useSearchParams();
  
  const productList = useSelector((state) => state.productList);
  const { loading, products, page: reduxPage, pages: totalPages } = productList;

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  
  const [allProducts, setAllProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const { addToCart: contextAddToCart } = useCart(); 

  useEffect(() => {
    const catParam = searchParams.get('category');
    setSelectedCategory(catParam || 'all');
  }, [searchParams]);

  useEffect(() => {
     const searchParam = searchParams.get('search');
     setSearchQuery(searchParam || '');
  }, [searchParams]);

  useEffect(() => {
     setAllProducts([]);
     setCurrPage(1);
     let categoryArg = selectedCategory === 'all' ? '' : selectedCategory;
     dispatch(listProducts(searchQuery, categoryArg, 1));
  }, [dispatch, selectedCategory, searchQuery]);

  useEffect(() => {
    if (products && Array.isArray(products) && !loading) {
        if (reduxPage === 1) {
            setAllProducts(products);
        } else if (reduxPage > 1) {
            setAllProducts(prev => {
                const existingIds = new Set(prev.map(p => p._id));
                const uniqueNew = products.filter(p => !existingIds.has(p._id));
                return [...prev, ...uniqueNew];
            });
        }
    }
  }, [products, reduxPage, loading]);

  const handleLoadMore = () => {
      const maxPages = totalPages || 1;
      if (currPage < maxPages && !loading) {
          const nextPage = currPage + 1;
          setCurrPage(nextPage);
          let categoryArg = selectedCategory === 'all' ? '' : selectedCategory;
          dispatch(listProducts(searchQuery, categoryArg, nextPage));
      }
  };

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product.slug || product._id, 1));
    router.push('/cart?redirect=shipping');
  };

  const handleDetails = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${product.slug || product._id}`);
  };

  const filteredAndSortedPrinters = useMemo(() => {
    let filtered = allProducts || [];
    filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'rating': sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'name': sorted.sort((a, b) => a.name?.localeCompare(b.name) || a.title?.localeCompare(b.title)); break;
      default: break;
    }
    return sorted;
  }, [allProducts, priceRange, sortBy]);

  return (
    <>
      <div className="printers-page bg-white min-h-screen">
        <div className="printers-container mx-auto" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          
          {/* Centered Heading */}
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 className="page-title" style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Printers</h1>
            <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
            <p className="page-subtitle" style={{ fontSize: '18px', color: '#64748b', maxWidth: '700px', margin: '0 auto', fontWeight: '500' }}>
               Explore our curated collection of high-performance printing solutions engineered for precision and excellence.
            </p>
          </div>

          {/* Centered Filter Bar using project styles */}
          <div className="filters-bar" style={{ background: '#f8f9fa', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                {/* Search */}
                <div style={{ flex: '3', position: 'relative', minWidth: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search specifically for your model..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#ffffff', fontWeight: '500' }}
                    />
                    <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>

                {/* Sort */}
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: '700', cursor: 'pointer', appearance: 'auto' }}
                    >
                        <option value="featured">Sort: Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>

                {/* Price */}
                <div style={{ background: '#ffffff', padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '250px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Max Price:</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="5000" 
                        step="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        style={{ flex: '1', accentColor: '#0f3d91', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f3d91', minWidth: '50px' }}>${priceRange.max}</span>
                </div>
             </div>
          </div>

          <div style={{ marginBottom: '32px', paddingLeft: '4px' }}>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Showing <strong style={{ color: '#0f172a' }}>{filteredAndSortedPrinters.length}</strong> items from our collection
            </p>
          </div>

          {/* Results Grid - Using styles for centering and spacing */}
          <div className="printers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {filteredAndSortedPrinters.map((printer, index) => (
              <div key={printer._id || index}>
                <HomeProductCard 
                  product={printer} 
                  handleDetails={handleDetails} 
                  handleBuyNow={handleBuyNow} 
                />
              </div>
            ))}
          </div>

          {loading && (
             <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                 <div style={{ width: '40px', height: '40px', border: '4px solid #f1f5f9', borderTop: '4px solid #0f3d91', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                 <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
             </div>
          )}

          {!loading && filteredAndSortedPrinters.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 20px', background: '#f8fafc', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>No matching results</h3>
              <p style={{ color: '#64748b', marginBottom: '32px' }}>Try resetting your search query or price ceiling.</p>
              <button 
                onClick={() => {setSearchQuery(''); setPriceRange({min: 0, max: 5000}); setSortBy('featured');}}
                style={{ background: '#0a3382', color: '#fff', padding: '12px 32px', borderRadius: '12px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {products && products.length > 0 && currPage < totalPages && !loading && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={handleLoadMore}
                    style={{ padding: '14px 40px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '99px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                  >
                      Load More Products
                  </button>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Printers;
