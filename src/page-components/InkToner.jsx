'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import { listCategories } from '../redux/actions/categoryActions';
import { addToCart } from '../redux/actions/cartActions';
import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';
import HomeProductCard from '../components/home/HomeProducts/HomeProductCard';
import '../styles/pages.css';

const InkToner = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const productList = useSelector((state) => state.productList);
  const { loading, products, page: reduxPage, pages: totalPages } = productList;

  useEffect(() => {
     return () => { setAllProducts([]); }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Ink & Toner');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  
  const [allProducts, setAllProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const { addToCart: contextAddToCart } = useCart();

  const categoryListState = useSelector((state) => state.categoryList);
  const { categories: allCategories } = categoryListState || {};

  const relevantCategories = useMemo(() => {
    if (!allCategories) return [];
    return allCategories.filter(c => 
      /Ink|Toner/i.test(c.name) && !/Printer/i.test(c.name)
    ).map(c => ({ id: c.name, label: c.name }));
  }, [allCategories]);

  useEffect(() => {
      dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) setSelectedCategory(catParam);
    else if (relevantCategories.length > 0) {
        const exists = relevantCategories.find(c => c.id === selectedCategory);
        if (!exists) {
            const defaultCat = relevantCategories.find(c => c.id === 'Ink & Toner');
            setSelectedCategory(defaultCat ? defaultCat.id : relevantCategories[0].id);
        }
    }
  }, [searchParams, relevantCategories, selectedCategory]);

  useEffect(() => {
     const searchParam = searchParams.get('search');
     setSearchQuery(searchParam || '');
  }, [searchParams]);

  useEffect(() => {
     setAllProducts([]);
     setCurrPage(1);
     if (selectedCategory) {
         dispatch(listProducts(searchQuery, selectedCategory, 1, selectedBrand));
     }
  }, [dispatch, selectedCategory, searchQuery, selectedBrand]);

  useEffect(() => {
    if (products && Array.isArray(products) && !loading) {
        if (reduxPage === 1) setAllProducts(products);
        else if (reduxPage > 1) {
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
          dispatch(listProducts(searchQuery, selectedCategory, nextPage, selectedBrand));
      }
  };

  const handleCategoryClick = (catId) => {
      setSelectedCategory(catId);
      // For Next.js we use router.push to update search params
      const params = new URLSearchParams(searchParams);
      params.set('category', catId);
      router.push(`/ink-toner?${params.toString()}`);
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

  const filteredAndSortedProducts = useMemo(() => {
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

  const uniqueBrands = ['HP', 'Canon', 'Brother', 'Epson'];

  return (
    <>
      <div className="ink-toner-page bg-white min-h-screen">
        <div className="ink-toner-container mx-auto" style={{ paddingTop: '60px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          
          {/* Centered Heading */}
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Ink & Toner</h1>
            <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '700px', margin: '0 auto', fontWeight: '500' }}>
               Premium quality supplies for all your printing hardware requirements.
            </p>
          </div>

          {/* Centered Filter Bar with Category Tabs */}
          <div className="filters-bar" style={{ background: '#f8f9fa', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
             
             {/* Category Tab Row */}
             <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                {relevantCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        style={{ padding: '10px 24px', borderRadius: '12px 12px 0 0', border: 'none', background: selectedCategory === cat.id ? '#0f3d91' : 'transparent', color: selectedCategory === cat.id ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.3s' }}
                    >
                        {cat.label}
                    </button>
                ))}
             </div>

             <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                {/* Search */}
                <div style={{ flex: '2.5', position: 'relative', minWidth: '300px' }}>
                    <input
                        type="text"
                        placeholder="Identify specific cartridge or toner models..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#ffffff', fontWeight: '500' }}
                    />
                    <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>

                {/* Brand */}
                <div style={{ flex: '1', minWidth: '180px' }}>
                    <select 
                        value={selectedBrand} 
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: '700', cursor: 'pointer' }}
                    >
                        <option value="all">Global Brands</option>
                        {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>

                {/* Sort */}
                <div style={{ flex: '1', minWidth: '180px' }}>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: '700', cursor: 'pointer' }}
                    >
                        <option value="featured">Best Matches</option>
                        <option value="price-low">Value Tier</option>
                        <option value="price-high">Luxury Tier</option>
                    </select>
                </div>
             </div>
          </div>

          <div style={{ marginBottom: '32px', paddingLeft: '4px' }}>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Found <strong style={{ color: '#0f172a' }}>{filteredAndSortedProducts.length}</strong> supplies matches
            </p>
          </div>

          {/* Results Grid Centered */}
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {filteredAndSortedProducts.map((p, index) => (
              <div key={p._id || index}>
                <HomeProductCard 
                  product={p} 
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

          {!loading && filteredAndSortedProducts.length === 0 && (
             <div style={{ textAlign: 'center', padding: '100px 20px', background: '#f8fafc', borderRadius: '32px', border: '1px dashed #cbd5e1' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>No matches found</h3>
                <p style={{ color: '#64748b', marginBottom: '32px' }}>Consider refining your brand or category selection.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setPriceRange({min: 0, max: 10000}); setSortBy('featured'); setSelectedBrand('all');}}
                  style={{ background: '#0a3382', color: '#fff', padding: '12px 32px', borderRadius: '12px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                >
                  Clear Selection
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

export default InkToner;
