'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { 
  listProductDetails, 
  listProducts,
  createProductReview, 
  updateProductReview, 
  deleteProductReview 
} from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { 
  PRODUCT_CREATE_REVIEW_RESET,
} from "../redux/constants/productConstants";
import { ShoppingCart, CreditCard, ChevronLeft, Lock } from 'lucide-react';

const ProductDetails = () => {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const dispatch = useDispatch();

  const optimizeCloudinaryUrl = (url, width = 800) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`);
  };

  const productList = useSelector((state) => state.productList);
  const { products: relatedProducts } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");

  // Review State
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [showEligibilityToast, setShowEligibilityToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview } = productReviewCreate;

  useEffect(() => {
    if (product && product.category) {
        const categoryName = product.category.name || product.category;
        dispatch(listProducts('', categoryName, 1));
    }
    
    const checkEligibility = async () => {
        if (userInfo && product && product._id) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
                const { data } = await axios.get(`${apiUrl}/orders/check-review-eligibility/${product._id}`, config);
                setCanReview(data.canReview);
            } catch (error) {
                setCanReview(false);
            }
        }
    };
    checkEligibility();
  }, [product, userInfo, dispatch]);

  useEffect(() => {
    if (successProductReview) {
        setRating(0);
        setComment("");
        setEditingReviewId(null);
        setShowReviewForm(false);
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        if(slug) dispatch(listProductDetails(slug));
    }
  }, [successProductReview, slug, dispatch]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (editingReviewId) {
       dispatch(updateProductReview(product._id, { rating, comment, reviewId: editingReviewId }));
       setEditingReviewId(null);
    } else {
       dispatch(createProductReview(product._id, { rating, comment }));
    }
  };

  const deleteReviewHandler = (reviewId) => {
      if(window.confirm('Are you sure you want to delete this review?')) {
          dispatch(deleteProductReview(product._id, reviewId));
          setTimeout(() => { if(slug) dispatch(listProductDetails(slug)) }, 1000); 
      }
  };

  const startEditReview = (review) => {
      setRating(review.rating);
      setComment(review.comment);
      setEditingReviewId(review._id);
      setShowReviewForm(true);
      window.scrollTo({ top: document.querySelector('.pd-tabs-wrapper').offsetTop, behavior: 'smooth' });
  };

  const handleReviewClick = () => {
    if (showReviewForm) { setShowReviewForm(false); return; }
    if (canReview) { setShowReviewForm(true); } 
    else { setShowEligibilityToast(true); setTimeout(() => setShowEligibilityToast(false), 3000); }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (slug) dispatch(listProductDetails(slug));
    window.scrollTo(0, 0); 
  }, [dispatch, slug]);

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
  }, [product]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  if (loading) return <div style={{ padding: '200px 0', textAlign: 'center' }}>Loading...</div>;
  if (error || !product) return <div style={{ padding: '200px 0', textAlign: 'center' }}>Product not found.</div>;

  const images = product.images?.length > 0 ? product.images : product.image ? [product.image] : [];
  const activeImgSrc = images[activeImageIndex];

  const handleAddToCart = () => {
    if (!userInfo) { setShowLoginToast(true); setTimeout(() => setShowLoginToast(false), 3000); return; }
    dispatch(addToCart(product.slug || product._id, qty));
    router.push('/cart');
  };

  const buyNowHandler = () => {
    if (!userInfo) { setShowLoginToast(true); setTimeout(() => setShowLoginToast(false), 3000); return; }
    dispatch(addToCart(product.slug || product._id, qty));
    router.push('/cart?redirect=shipping');
  };

  return (
    <>
      <style>{`
        .pd-wrapper { padding: 40px 0; background: #fff; }
        .pd-layout { max-width: 1300px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 480px; gap: 60px; align-items: start; }
        
        .pd-gallery { display: flex; flex-direction: column; gap: 24px; }
        .pd-main-image-container { position: relative; border: 1px solid #f1f5f9; border-radius: 8px; aspect-ratio: 1/1; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #fff; }
        .pd-main-image-wrapper { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; cursor: crosshair; }
        .pd-main-image-wrapper img { max-width: 80%; max-height: 80%; object-fit: contain; transition: transform 0.2s ease-out; }
        
        .stock-badge-blue { position: absolute; top: 20px; left: 20px; background: #0f3d91; color: #fff; font-size: 9px; font-weight: 900; padding: 6px 12px; border-radius: 4px; display: flex; align-items: center; gap: 6px; z-index: 10; letter-spacing: 0.05em; }
        
        .slider-arrow-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: #fff; border: 1px solid #f1f5f9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 24px; cursor: pointer; transition: all 0.2s; z-index: 10; }
        .slider-arrow-nav:hover { color: #0f3d91; border-color: #0f3d91; }
        .slider-arrow-nav.prev { left: 20px; }
        .slider-arrow-nav.next { right: 20px; }

        .pd-thumbnails-strip { position: relative; padding-bottom: 12px; }
        .pd-thumbnails-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: thin; scrollbar-color: #f1f5f9 transparent; }
        .pd-thumbnails-scroll::-webkit-scrollbar { height: 4px; }
        .pd-thumbnails-scroll::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        
        .thumb-box { min-width: 85px; height: 85px; border: 1px solid #f1f5f9; border-radius: 4px; padding: 8px; cursor: pointer; background: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .thumb-box.active { border-color: #0f3d91; border-width: 1.5px; }
        .thumb-box img { max-width: 100%; max-height: 100%; object-fit: contain; }

        .pd-content { display: flex; flex-direction: column; gap: 28px; }
        .tag-group { display: flex; gap: 10px; }
        .badge-tag { font-size: 9px; font-weight: 900; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.05em; }
        .brand-tag { background: #eff6ff; color: #0f3d91; }
        .category-tag { background: #f8fafc; color: #94a3b8; }

        .pd-title-main { font-size: 32px; font-weight: 800; color: #1e293b; margin: 0; line-height: 1.2; letter-spacing: -0.01em; }
        .pd-price-main { font-size: 32px; font-weight: 800; color: #1e293b; margin: 0; }
        
        .attr-badge-group { display: flex; gap: 16px; }
        .mini-attr { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #f1f5f9; padding: 8px 16px; border-radius: 6px; }
        .mini-label { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
        .mini-val { font-size: 11px; font-weight: 900; color: #1e293b; text-transform: uppercase; }

        .qty-picker-row { display: flex; flex-direction: column; gap: 12px; }
        .qty-title { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .qty-flex { display: flex; align-items: center; gap: 20px; }
        .qty-stepper { display: flex; align-items: center; border: 1px solid #f1f5f9; border-radius: 4px; overflow: hidden; height: 44px; background: #fff; }
        .qty-stepper button { width: 44px; height: 100%; border: none; background: transparent; font-size: 18px; cursor: pointer; color: #1e293b; }
        .qty-stepper input { width: 44px; height: 100%; border: none; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; text-align: center; font-size: 13px; font-weight: 800; outline: none; color: #1e293b; }
        .qty-avail { font-size: 12px; color: #cbd5e1; font-weight: 700; }

        .action-button-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px; }
        .action-btn { height: 56px; border-radius: 6px; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: all 0.2s; border: none; }
        .btn-cart-black { background: #000; color: #fff; }
        .btn-cart-black:hover { background: #1e293b; }
        .btn-buy-blue { background: #0f3d91; color: #fff; }
        .btn-buy-blue:hover { background: #0a2a66; }

        .trust-grid-simple { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-top: 32px; border-top: 1px solid #f1f5f9; margin-top: 12px; }
        .trust-cell { display: flex; align-items: center; gap: 16px; }
        .trust-icon-blue { color: #0f3d91; opacity: 0.8; }
        .trust-info { display: flex; flex-direction: column; }
        .trust-head { font-size: 12px; font-weight: 800; color: #1e293b; }
        .trust-desc { font-size: 10px; color: #94a3b8; font-weight: 600; }

        .pd-tabs-wrapper { margin-top: 80px; border-top: 1px solid #f1f5f9; }
        .tabs-header { max-width: 1300px; margin: 0 auto; padding: 0 40px; display: flex; gap: 40px; }
        .tab-trigger { padding: 24px 0; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #94a3b8; border: none; background: none; cursor: pointer; position: relative; }
        .tab-trigger.active { color: #0f3d91; }
        .tab-trigger.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #0f3d91; }
        .tab-content-container { max-width: 1300px; margin: 0 auto; padding: 40px 40px 100px; overflow: hidden; }

        .product-overview-content, .highlights-content, .short-specs-content { overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; max-width: 100%; }

        @media (max-width: 1100px) {
            .pd-layout { grid-template-columns: 1fr; gap: 48px; padding: 0 24px; }
            .pd-content { gap: 24px; }
            .pd-title-main { font-size: 26px; }
            .tabs-header { padding: 0 24px; }
            .tab-content-container { padding: 40px 24px; }
        }
      `}</style>

      {showEligibilityToast && (
        <div className="fixed top-24 right-5 bg-orange-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3">
          <Lock size={20} />
          <div><h4 className="font-bold">Verification Failed</h4><p className="text-sm">Please purchase and receive this item to review.</p></div>
        </div>
      )}

      <div className="pd-wrapper">
        <div className="pd-layout">
          <div className="pd-top-nav" style={{ gridColumn: '1 / -1', marginBottom: '10px' }}>
            <div className="pd-breadcrumbs" style={{ display: 'flex', gap: '8px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94a3b8' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                <span style={{ opacity: 0.5 }}>/</span>
                <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
                <span style={{ opacity: 0.5 }}>/</span>
                <span style={{ color: '#1e293b' }}>{product.title}</span>
            </div>
          </div>

          <div className="pd-gallery">
            <div className="pd-main-image-container">
              {product.countInStock > 0 && (
                <div className="stock-badge-blue">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   IN STOCK
                </div>
              )}
              <div className="pd-main-image-wrapper" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onMouseMove={handleMouseMove}>
                <img src={optimizeCloudinaryUrl(activeImgSrc, 1200)} alt={product.title} style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: isHovered ? "scale(1.5)" : "scale(1)" }} />
              </div>
              {images.length > 1 && (
                <>
                  <button className="slider-arrow-nav prev" onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}>‹</button>
                  <button className="slider-arrow-nav next" onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}>›</button>
                </>
              )}
            </div>
            <div className="pd-thumbnails-strip">
              <div className="pd-thumbnails-scroll">
                {images.map((img, i) => (
                  <div key={i} className={`thumb-box ${i === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(i)}>
                    <img src={optimizeCloudinaryUrl(img, 200)} alt={`${product.title} view ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pd-content">
            <div className="tag-group">
                <span className="badge-tag brand-tag">{product.brand}</span>
                <span className="badge-tag category-tag">{product.category?.name || product.category || 'All-in-One'}</span>
            </div>
            <h1 className="pd-title-main">{product.title || product.name}</h1>
            <h2 className="pd-price-main">${product.price?.toFixed(2)}</h2>
            <div className="attr-badge-group">
                {product.technology && product.technology.length > 0 && (
                    <div className="mini-attr">
                        <span className="mini-label">Technology:</span>
                        <span className="mini-val">{Array.isArray(product.technology) ? product.technology[0] : product.technology}</span>
                    </div>
                )}
                {product.usageCategory && product.usageCategory.length > 0 && (
                    <div className="mini-attr">
                        <span className="mini-label">Use:</span>
                        <span className="mini-val">{Array.isArray(product.usageCategory) ? product.usageCategory[0] : product.usageCategory}</span>
                    </div>
                )}
            </div>
            {product.countInStock > 0 && (
                <div className="qty-picker-row">
                    <span className="qty-title">Quantity</span>
                    <div className="qty-flex">
                        <div className="qty-stepper">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
                            <input type="text" readOnly value={qty} />
                            <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} disabled={qty >= product.countInStock}>+</button>
                        </div>
                        <span className="qty-avail">{product.countInStock} available</span>
                    </div>
                </div>
            )}
            <div className="action-button-grid">
                <button className="action-btn btn-cart-black" onClick={handleAddToCart} disabled={product.countInStock === 0}>
                    <ShoppingCart size={16} strokeWidth={2.5} /> Add to Cart
                </button>
                <button className="action-btn btn-buy-blue" onClick={buyNowHandler} disabled={product.countInStock === 0}>
                    <CreditCard size={16} strokeWidth={2.5} /> Buy Now
                </button>
            </div>
            <div className="trust-grid-simple">
                <div className="trust-cell">
                    <div className="trust-icon-blue"><ShoppingCart size={20} /></div>
                    <div className="trust-info"><span className="trust-head">Free Shipping</span><span className="trust-desc">Orders over $249</span></div>
                </div>
                <div className="trust-cell">
                    <div className="trust-icon-blue"><ChevronLeft size={20} /></div>
                    <div className="trust-info"><span className="trust-head">Easy Returns</span><span className="trust-desc">30-day window</span></div>
                </div>
                <div className="trust-cell">
                    <div className="trust-icon-blue"><Lock size={20} /></div>
                    <div className="trust-info"><span className="trust-head">Warranty</span><span className="trust-desc">Manufacturer covered</span></div>
                </div>
                <div className="trust-cell">
                    <div className="trust-icon-blue"><ShoppingCart size={20} /></div>
                    <div className="trust-info"><span className="trust-head">Authentic</span><span className="trust-desc">Product authorized</span></div>
                </div>
            </div>
          </div>
        </div>

        <div className="pd-tabs-wrapper">
            <div className="tabs-header">
                {['overview', 'specifications', 'reviews'].map((t) => (
                    <button key={t} className={`tab-trigger ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
                ))}
            </div>
            <div className="tab-content-container">
                {tab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div className="product-overview-content" dangerouslySetInnerHTML={{ __html: product.overview || product.description || 'Updating...' }} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.8 }} />
                        {product.shortDetails && (
                            <div><h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '20px' }}>Features</h3>
                            <div className="highlights-content" dangerouslySetInnerHTML={{ __html: product.shortDetails }} style={{ fontSize: '15px', lineHeight: 1.7, color: '#4b5563' }} /></div>
                        )}
                    </div>
                )}
                {tab === 'specifications' && (
                    <div style={{ maxWidth: '1000px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '32px' }}>Specifications</h2>
                        {(() => {
                            try {
                                const parsedSpecs = JSON.parse(product.technicalSpecification);
                                if (Array.isArray(parsedSpecs)) {
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #f1f5f9' }}>
                                            {parsedSpecs.map((row, i) => (
                                                <div key={i} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '64px' }}>
                                                    <div style={{ width: '35%', padding: '20px 32px', background: '#f8fafc', fontSize: '11px', fontWeight: '900', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center' }}>{row.name || row.key}</div>
                                                    <div style={{ flex: 1, padding: '20px 32px', fontSize: '14px', fontWeight: '600', color: '#1e293b', lineHeight: 1.6, display: 'flex', alignItems: 'center', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{row.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                            } catch (e) {
                                return <div className="technical-specs-content" dangerouslySetInnerHTML={{ __html: product.technicalSpecification }} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.8 }} />;
                            }
                        })()}
                    </div>
                )}
                {tab === 'reviews' && (
                    <div style={{ maxWidth: '800px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '32px' }}>Reviews</h3>
                        <button onClick={handleReviewClick} style={{ padding: '16px 32px', background: '#0f3d91', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer' }}>Write a Review</button>
                        <div style={{ marginTop: '40px' }}>
                            {product.reviews?.length > 0 ? product.reviews.map((rev) => (
                                <div key={rev._id} style={{ padding: '32px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '800', fontSize: '15px' }}>{rev.name}</span>
                                        <span style={{ color: '#9ca3af', fontSize: '12px' }}>{rev.createdAt?.substring(0, 10)}</span>
                                    </div>
                                    <div style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '12px' }}>{"★".repeat(rev.rating)}</div>
                                    <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.7 }}>{rev.comment}</p>
                                </div>
                            )) : <p style={{ color: '#6b7280' }}>No reviews yet.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
            <div style={{ maxWidth: '1300px', margin: '80px auto 0', padding: '0 40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '40px' }}>You Might Also Like</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '32px' }}>
                    {relatedProducts.filter(p => p._id !== product._id).slice(0, 4).map(p => (
                        <Link href={`/product/${p.slug || p._id}`} key={p._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                                <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    <img src={optimizeCloudinaryUrl(p.image || (p.images && p.images[0]), 300)} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '10px', height: '40px', overflow: 'hidden' }}>{p.name}</h4>
                                <p style={{ fontSize: '16px', fontWeight: '900', color: '#0f3d91' }}>${p.price?.toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
