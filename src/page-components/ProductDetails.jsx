'use client';
import { useState, useEffect, useRef } from "react";
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
  PRODUCT_UPDATE_REVIEW_RESET
} from "../redux/constants/productConstants";
import { ShoppingCart, CreditCard } from 'lucide-react';

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

  // Review State & Selectors
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [showEligibilityToast, setShowEligibilityToast] = useState(false);
  
  // Toaster State
  const [showLoginToast, setShowLoginToast] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userHasReviewed = product?.reviews?.some((r) => r.user === userInfo?._id);

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (product && product.category) {
        const categoryName = product.category.name || product.category;
        dispatch(listProducts('', categoryName, 1));
    }
    
    const checkEligibility = async () => {
        if (userInfo && product && product._id) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/orders/check-review-eligibility/${product._id}`,
                    config
                );
                setCanReview(data.canReview);
            } catch (error) {
                console.error("Error checking review eligibility", error);
                setCanReview(false);
            }
        }
    };
    checkEligibility();

  }, [dispatch, product, userInfo]);

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
      window.scrollTo({ top: document.querySelector('.tabs-container').offsetTop, behavior: 'smooth' });
  };
const handleReviewClick = () => {
    if (showReviewForm) {
      setShowReviewForm(false);
      return;
    }
    
    if (canReview) {
      setShowReviewForm(true);
    } else {
      setShowEligibilityToast(true);
      setTimeout(() => setShowEligibilityToast(false), 3000);
    }
  };

  
  // Zoom state
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

  if (loading) {
    return (
      <div className="loading-container">
         <div className="spinner"></div>
         <p>Loading Product Details...</p>
         <style>{`
          .loading-container { padding-top: 120px; padding-bottom: 100px; text-align: center; min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0f3d91; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center", minHeight: "60vh" }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];
  
  const activeImgSrc = images[activeImageIndex];

  const handleAddToCart = () => {
    if (!userInfo) {
       setShowLoginToast(true);
       setTimeout(() => setShowLoginToast(false), 3000);
       return;
    }
    dispatch(addToCart(product.slug || product._id, qty));
    router.push('/cart');
  };

  const buyNowHandler = () => {
      if (!userInfo) {
        setShowLoginToast(true);
        setTimeout(() => setShowLoginToast(false), 3000);
        return;
      }
      dispatch(addToCart(product.slug || product._id, qty));
      router.push('/cart?redirect=shipping');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      {showEligibilityToast && (
        <div className="fixed top-24 right-5 bg-orange-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-bold">Verification Failed</h4>
            <p className="text-sm">Please purchase and receive this item to review.</p>
          </div>
        </div>
      )}

      {showLoginToast && (
        <div className="fixed top-24 right-5 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-bold">Access Denied</h4>
            <p className="text-sm">Please login to add items to cart</p>
          </div>
        </div>
      )}

      <div className="pd-wrapper">
        <div className="pd-layout">
          
          {/* THUMBNAILS */}
          <div className="pd-thumbs">
            {images.map((img, i) => (
              <img
                key={i}
                src={optimizeCloudinaryUrl(img, 200)}
                className={i === activeImageIndex ? "active" : ""}
                onMouseEnter={() => setActiveImageIndex(i)}
                onClick={() => setActiveImageIndex(i)}
                alt={`${product.title} view ${i + 1}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE CONTAINER */}
          <div className="pd-image-container">
            <div 
                className="pd-image-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
              <img 
                src={optimizeCloudinaryUrl(activeImgSrc, 1200)} 
                alt={product.title} 
                style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isHovered ? "scale(1.6)" : "scale(1)",
                }}
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="pd-info">
            <span className="brand">{product.brand}</span>
            <h1>{product.title || product.name}</h1>

             {/* HIGHLIGHTS */}
             {product.shortDetails && (
              <div className="key-specs">
                <h4>Highlights</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.shortDetails,
                  }}
                />
              </div>
            )}

            <div className="rating-summary">
                 <span className="stars">{"⭐".repeat(Math.round(product.rating || 0))}</span>
                 <span className="rating-count">({product.numReviews || 0} reviews)</span>
            </div>

            <div className="price-section">
                <span className="price">${product.price?.toFixed(2)}</span>
                {product.oldPrice && (
                    <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                )}
                {product.countInStock > 0 ? (
                    <span className="stock-status in-stock">In Stock</span>
                ) : (
                    <span className="stock-status out-stock">Out of Stock</span>
                )}
            </div>

            {/* QUANTITY */}
            {product.countInStock > 0 && (
              <div className="qty-picker">
                <span className="qty-label">Quantity:</span>
                <div className="qty-controls">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
                  <input type="text" readOnly value={qty} />
                  <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} disabled={qty >= product.countInStock}>+</button>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="actions">
              <button
                className="btn-cart"
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
                {product.countInStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
              <button 
                className="btn-buy" 
                disabled={product.countInStock === 0}
                onClick={buyNowHandler}
              >
                <CreditCard size={20} strokeWidth={2.5} />
                BUY NOW
              </button>
            </div>


          </div>
        </div>

        {/* ══ FLAGSHIP ASSET TABS ══════════════════════════════════════ */}
        <div className="tabs-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Tab header */}
            <div className="flex border-b border-gray-100 px-4 sm:px-8 overflow-x-auto">
              <div className="flex">
                {['overview', 'specifications', 'reviews'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      position: 'relative',
                      padding: '24px 8px',
                      marginRight: '48px',
                      fontSize: '11px',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      color: tab === t ? '#0f3d91' : '#94a3b8',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {t === "specifications" ? "Technical Specs" : t}
                    {tab === t && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0f3d91]" style={{ borderRadius: '2px 2px 0 0' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div className="p-6 sm:p-10 lg:p-14 min-h-72">

              {/* OVERVIEW - MINIMALIST SHOWROOM */}
              {tab === 'overview' && (
                <div className="max-w-4xl animate-fadeIn" style={{ maxWidth: '900px', margin: '0 auto' }}>
                   <div style={{ padding: '20px 25px' }}>
                     <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#000000', marginBottom: '32px', letterSpacing: '-0.02em' }}>About this product</h2>
                     
                     <div style={{ marginBottom: '40px' }}>
                        <div 
                          className="product-overview-content"
                          dangerouslySetInnerHTML={{ __html: product.overview || product.description || 'Information for this product is currently being updated.' }}
                          style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.7, fontWeight: '500' }}
                        />
                     </div>

                     {product.shortSpecification && (
                        <div className="feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div 
                              className="short-specs-content"
                              dangerouslySetInnerHTML={{ __html: product.shortSpecification }}
                              style={{ fontSize: '16px', lineHeight: 1.6, color: '#4b5563', fontWeight: '500' }}
                            />
                        </div>
                     )}
                   </div>
                </div>
              )}

              {/* SPECIFICATIONS */}
              {tab === 'specifications' && (
                <div className="max-w-5xl animate-fadeIn">
                  <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', marginBottom: '32px', textTransform: 'uppercase' }}>Technical <span style={{ color: '#0f3d91' }}>Manifest</span></h2>
                  
                  {product.technicalSpecification ? (
                    <div 
                      className="technical-specs-content"
                      dangerouslySetInnerHTML={{ __html: product.technicalSpecification }}
                      style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7 }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { l: "Manufacturer Brand", v: product.brand },
                          { l: "Asset Category", v: product.category?.name || product.category },
                          { l: "Product Model", v: product.title || product.name },
                          { l: "Color", v: product.color },
                          { l: "Dimensions (W x H x D)", v: (product.width && product.height && product.depth) ? `${product.width} x ${product.height} x ${product.depth}` : null },
                          { l: "Screen Size", v: product.screenSize },
                          { l: "Availability", v: product.countInStock > 0 ? "In Stock" : "Out of Stock" },
                          { l: "Verification Status", v: "Official Record" },
                          { l: "Platform Compatibility", v: "Universal Wireless" },
                          { l: "Operational Lifecycle", v: "Professional Grade" },
                          { l: "Data Connectivity", v: "Cloud-Enabled" },
                        ].filter(r => r.v).map((row, i) => (
                          <div key={i} style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fcfdfe' }}>
                              <div style={{ padding: '20px 32px', width: '35%', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', background: '#f8fafc' }}>{row.l}</div>
                              <div style={{ padding: '20px 32px', flex: 1, fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{row.v}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* REVIEWS - EXECUTIVE FEEDBACK SHOWCASE */}
              {tab === 'reviews' && (
                <div className="max-w-3xl mx-auto animate-fadeIn" style={{ maxWidth: '800px', margin: '0 auto', overflowX: 'hidden' }}>

                   {/* REVIEW WORKSTATION - THE INPUT HUB */}
                   <div style={{ marginBottom: '100px', padding: '48px', background: '#fcfdfe', borderRadius: '40px', border: '1px solid #f1f5f9' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#000000', marginBottom: '12px', letterSpacing: '-0.02em' }}>Review <span style={{ color: '#0f3d91' }}>Workstation</span></h2>
                      <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '500', marginBottom: '40px' }}>Register your official performance assessment for this asset.</p>

                      {!userInfo ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #e2e8f0', borderRadius: '32px' }}>
                           <p style={{ fontSize: '15px', fontWeight: '600', color: '#64748b', marginBottom: '24px' }}>Please authenticate to access the workstation.</p>
                           <Link href="/signin" style={{ display: 'inline-block', padding: '16px 32px', background: '#000000', color: '#ffffff', borderRadius: '16px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none' }}>Sign In</Link>
                        </div>
                      ) : !canReview ? (
                        <div style={{ padding: '60px 40px', background: '#fff7ed', borderRadius: '32px', border: '1px solid #ffedd5', textAlign: 'center' }}>
                           <div style={{ width: '56px', height: '56px', background: '#fb923c', borderRadius: '100px', display: 'flex', alignItems: 'center', justify_content: 'center', margin: '0 auto 24px', color: '#ffffff', fontSize: '24px' }}>⚠️</div>
                           <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#9a3412', marginBottom: '12px' }}>Verified Purchase Required</h4>
                           <p style={{ fontSize: '15px', color: '#c2410c', fontWeight: '500', lineHeight: 1.6, marginBottom: '32px' }}>
                              This workstation is reserved exclusively for verified owners. <br />
                              Please purchase and receive this asset to register your performance assessment.
                           </p>
                           <button onClick={handleAddToCart} style={{ display: 'inline-block', padding: '16px 32px', background: '#9a3412', color: '#ffffff', borderRadius: '16px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Add to Cart Now</button>
                        </div>
                      ) : (
                        <form onSubmit={submitReviewHandler} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Quality Verification Rating</label>
                            <div style={{ display: 'flex', gap: '16px' }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setRating(star)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontSize: '36px',
                                    color: rating >= star ? '#fbbf24' : '#e2e8f0',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: rating >= star ? 'scale(1.1)' : 'scale(1)'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.25)'}
                                  onMouseLeave={(e) => e.currentTarget.style.transform = rating >= star ? 'scale(1.1)' : 'scale(1)'}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Technical Feedback</label>
                            <textarea
                              rows="6"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Describe your operational experience with this asset..."
                              style={{
                                width: '100%',
                                padding: '24px',
                                background: '#ffffff',
                                border: '1.5px solid #e2e8f0',
                                borderRadius: '24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#000000',
                                outline: 'none',
                                resize: 'none',
                                lineHeight: 1.6,
                                transition: 'all 0.3s ease'
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = '#0f3d91';
                                e.target.style.boxShadow = '0 10px 30px -10px rgba(15, 61, 145, 0.1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                              }}
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={rating === 0 || !comment.trim()}
                            style={{
                               width: '100%',
                               height: '72px',
                               background: '#0f3d91',
                               color: '#ffffff',
                               borderRadius: '24px',
                               fontSize: '14px',
                               fontWeight: '900',
                               textTransform: 'uppercase',
                               letterSpacing: '0.15em',
                               cursor: 'pointer',
                               border: 'none',
                               transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                               opacity: (rating === 0 || !comment.trim()) ? 0.4 : 1,
                               boxShadow: '0 12px 30px -10px rgba(15, 61, 145, 0.4)'
                            }}
                          >
                            Submit Official Review
                          </button>
                        </form>
                      )}
                   </div>

                   {/* CLIENT FEEDBACK LOG */}
                   <div style={{ padding: '0 20px' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#000000', marginBottom: '48px', letterSpacing: '-0.02em' }}>Client <span style={{ color: '#0f3d91' }}>Feedback</span></h2>

                      {!product.reviews?.length ? (
                        <div style={{ padding: '80px 0', textAlign: 'center' }}>
                           <p style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8' }}>No certified feedback has been registered for this asset yet.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {product.reviews.map((rev) => (
                            <div key={rev._id} style={{ padding: '48px 0', borderBottom: '1px solid #f1f5f9' }}>
                               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f3d91', display: 'flex', alignItems: 'center', justify_content: 'center', fontSize: '14px', fontWeight: '900' }}>{rev.name?.charAt(0)?.toUpperCase()}</div>
                                     <div>
                                        <p style={{ fontSize: '15px', fontWeight: '900', color: '#000000', margin: 0 }}>{rev.name}</p>
                                        <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', margin: 0 }}>{rev.createdAt?.substring(0, 10)}</p>
                                     </div>
                                  </div>
                                  <div style={{ color: '#fbbf24', fontSize: '12px', letterSpacing: '1px' }}>{"★".repeat(rev.rating)}</div>
                               </div>
                               <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.8, fontWeight: '500', margin: 0 }}>{rev.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                   </div>

                </div>
              )}

            </div>
          </div>
        </div>

      {/* RELATED PRODUCTS - EXECUTIVE GRID */}
      {relatedProducts && relatedProducts.length > 0 && (
         <div className="related-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
                 <div>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.25em', display: 'block', marginBottom: '12px' }}>Curation Hub</span>
                    <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#1e293b', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>You Might <span style={{ color: '#0f3d91' }}>Also Like</span></h2>
                 </div>
                 <Link href="/printers" style={{ fontSize: '13px', fontWeight: '900', color: '#0f3d91', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '2px solid #0f3d91', paddingBottom: '4px' }}>Explore Full Registry</Link>
              </div>
              
              <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
                 {relatedProducts.filter(p => p._id !== product._id).slice(0, 4).map(p => (
                    <Link href={`/product/${p.slug || p._id}`} key={p._id} className="related-exec-card" onClick={() => window.scrollTo(0,0)}>
                        <div style={{ height: '280px', background: '#ffffff', borderRadius: '32px', padding: '32px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justify_content: 'center', transition: 'all 0.3s ease' }} className="related-img-host">
                             <img src={optimizeCloudinaryUrl(p.image || (p.images && p.images[0]), 400)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        <div style={{ padding: '24px 8px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b', marginBottom: '12px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f3d91' }}>${p.price?.toFixed(2)}</span>
                                <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View Asset</span>
                            </div>
                        </div>
                    </Link>
                 ))}
              </div>
           </div>
        )}

        <style>{`
          .pd-wrapper { padding: 40px 0 0; background: #fff; }
          .pd-layout { display: grid; grid-template-columns: 100px 1fr 450px; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          .pd-thumbs { display: flex; flex-direction: column; gap: 20px; }
          .pd-thumbs img { width: 100px; height: 100px; object-fit: contain; border-radius: 20px; border: 2px solid #f8fafc; cursor: pointer; padding: 12px; background: #fff; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .pd-thumbs img.active { border-color: #0f3d91; box-shadow: 0 10px 25px -5px rgba(15, 61, 145, 0.15); transform: scale(1.05); }
          .pd-image-wrapper { background: #ffffff; border-radius: 64px; border: 1px solid #f1f5f9; height: 720px; display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 4px 20px -10px rgba(0,0,0,0.05); }
          .pd-image-wrapper img { width: 85%; height: 85%; object-fit: contain; mix-blend-mode: multiply; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
          .pd-info { padding: 10px 0; display: flex; flex-direction: column; }
          .pd-info .brand { font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.35em; display: block; margin-bottom: 20px; }
          .pd-info h1 { font-size: 44px; font-weight: 900; color: #1e293b; margin-bottom: 24px; letter-spacing: -0.03em; line-height: 1.1; }
          .rating-summary { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #f1f5f9; }
          .price-section { display: flex; align-items: flex-end; gap: 24px; margin-bottom: 48px; }
          .price-section .price { font-size: 56px; font-weight: 900; color: #0f3d91; letter-spacing: -0.025em; line-height: 1; }
          .price-section .stock-status { font-size: 11px; font-weight: 900; text-transform: uppercase; padding: 10px 18px; border-radius: 12px; letter-spacing: 0.05em; margin-bottom: 12px; }
          .in-stock { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }
          .key-specs { margin-bottom: 48px; padding: 40px; background: #fcfdfe; border-radius: 32px; border: 1px solid #f1f5f9; border-top: 4px solid #0f3d91; }
          .key-specs h4 { font-size: 12px; font-weight: 900; color: #1e293b; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px; }
          .qty-picker { margin-bottom: 56px; display: flex; align-items: center; gap: 40px; }
          .qty-label { font-size: 12px; font-weight: 900; color: #1e293b; text-transform: uppercase; letter-spacing: 0.15em; }
          .qty-controls { display: flex; align-items: center; background: #f8fafc; border-radius: 20px; padding: 8px; border: 1px solid #f1f5f9; }
          .qty-controls button { width: 48px; height: 48px; border-radius: 14px; border: none; background: #fff; font-size: 20px; font-weight: 900; cursor: pointer; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.2s; }
          .qty-controls input { width: 60px; text-align: center; background: transparent; border: none; font-size: 18px; font-weight: 900; color: #0f3d91; outline: none; }
          .actions { display: flex; gap: 24px; margin-top: auto; }
          .actions button { flex: 1; height: 76px; border-radius: 24px; font-size: 14px; font-weight: 900; text-transform: uppercase; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 14px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); letter-spacing: 0.12em; }
          .btn-cart { background: #ffffff; border: 3.5px solid #0f3d91 !important; color: #0f3d91; }
          .btn-buy { background: #0f3d91; color: #ffffff; box-shadow: 0 15px 35px -10px rgba(15, 61, 145, 0.45); }
          .btn-buy:hover { background: #0a2a66; transform: translateY(-5px); box-shadow: 0 25px 50px -10px rgba(15, 61, 145, 0.55); }
          .btn-cart:hover { background: #f0f7ff; transform: translateY(-5px); }
          .tabs-container { margin-top: 120px !important; }
          .related-section { margin-top: 120px !important; padding-bottom: 120px; }
          @media (max-width: 1024px) {
            .pd-layout { grid-template-columns: 1fr; gap: 64px; }
            .pd-thumbs { flex-direction: row; order: 2; overflow-x: auto; padding-bottom: 12px; gap: 16px; }
            .pd-image-wrapper { height: 550px; order: 1; border-radius: 48px; }
            .pd-info { order: 3; }
            .actions { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; padding: 24px; z-index: 100; border-top: 1px solid #f1f5f9; box-shadow: 0 -15px 50px rgba(0,0,0,0.08); margin: 0; border-radius: 40px 40px 0 0; }
            .pd-wrapper { padding-bottom: 140px; }
          }
          @media (max-width: 600px) {
            .pd-info h1 { font-size: 28px; }
            .price-section .price { font-size: 40px; }
            .pd-image-wrapper { height: 400px; }
            .pd-layout { padding: 0 20px; }
            .tabs-container, .related-section { padding: 0 20px; }
          }
        `}</style>
      </div>
    </>
  );
};

export default ProductDetails;
