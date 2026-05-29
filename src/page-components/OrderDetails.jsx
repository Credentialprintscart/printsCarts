'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getOrderDetails } from '../redux/actions/orderActions';
import { FiArrowLeft, FiShoppingBag, FiTruck, FiCheckCircle, FiShield, FiPackage, FiActivity } from "react-icons/fi";

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    // Calculate step for timeline
    const getStatusStep = (status) => {
        switch (status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Out for Delivery': return 3;
            case 'Delivered': return 4;
            default: return 1;
        }
    };

    const currentStep = order ? getStatusStep(order.status) : 0;
    const steps = [
        { label: 'Entry', icon: FiPackage },
        { label: 'Transit', icon: FiTruck },
        { label: 'Destination', icon: FiActivity },
        { label: 'Release', icon: FiCheckCircle },
    ];

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%'
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '32px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        padding: '40px',
        marginBottom: '32px'
    };

    const headerLabelStyle = {
        fontSize: '11px',
        fontWeight: '900',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: '12px',
        display: 'block'
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
                
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ width: '48px', height: '48px', border: '5px solid #f1f5f9', borderTop: '5px solid #0f3d91', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ fontWeight: '900', color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Accessing Registry Manifest...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
                
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
                
                <div style={{ flexGrow: 1, ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
                    <div style={{ ...cardStyle, textAlign: 'center', maxWidth: '600px' }}>
                        <FiShoppingBag size={64} style={{ color: '#fee2e2', marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginBottom: '16px', letterSpacing: '-0.02em' }}>Sync Critical Failure</h2>
                        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px', lineHeight: 1.6 }}>{error}</p>
                        <button onClick={() => window.location.reload()} style={{ background: '#0f3d91', color: '#fff', padding: '16px 48px', borderRadius: '16px', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer' }}>Retry Handshake</button>
                    </div>
                </div>
                
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
            
            
            <main style={{ flexGrow: 1, paddingTop: '100px', paddingBottom: '120px' }}>
                <div style={containerStyle} className="registry-container">
                    
                    {/* Navigation Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
                        <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#f8fafc', color: '#0f3d91', textDecoration: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', transition: 'all 0.3s ease', border: '1px solid #f1f5f9' }} className="hover-lift">
                            <FiArrowLeft size={16} /> Hub Terminal
                        </Link>
                        <div style={{ flexGrow: 1, height: '1px', background: '#f1f5f9' }}></div>
                    </div>

                    {/* Registry Header */}
                    <div style={{ textAlign: 'center', marginBottom: '80px', padding: '0 20px' }}>
                        <span style={{ ...headerLabelStyle, marginBottom: '20px' }}>Authorized Procurement Registry</span>
                        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', color: '#1e293b', marginBottom: '28px', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                            Manifest <span style={{ color: '#0f3d91' }}>#{(order?._id || '').slice(-8).toUpperCase()}</span>
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: order?.isPaid ? '#0f3d91' : '#f59e0b', color: '#ffffff', padding: '14px 28px', borderRadius: '18px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}></div>
                                {order?.isPaid ? 'Verification Authorized' : 'Fiscal Audit Pending'}
                             </div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', padding: '14px 28px', borderRadius: '18px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <FiActivity size={16} /> Status: {order?.status}
                             </div>
                        </div>
                    </div>

                    {order && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            
                            {/* Milestone Array (Centered) */}
                            <div className="elite-card" style={{ ...cardStyle }}>
                                <span style={{ ...headerLabelStyle, textAlign: 'center', marginBottom: '40px' }}>Procurement Milestone Tracking</span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: '800px', margin: '40px auto 0', width: '100%' }}>
                                    {/* Connectivity Line */}
                                    <div style={{ position: 'absolute', top: '24px', left: '40px', right: '40px', height: '4px', background: '#f1f5f9', zIndex: 0 }}>
                                        <div style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, height: '100%', background: '#0f3d91', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                                    </div>
                                    
                                    {steps.map((step, index) => (
                                        <div key={index} style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '80px' }}>
                                            <div style={{ 
                                                width: '52px', height: '52px', background: index <= currentStep - 1 ? '#0f3d91' : '#ffffff', 
                                                border: '4px solid #ffffff', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: index === currentStep - 1 ? '0 10px 15px -3px rgba(15,61,145,0.4)' : (index < currentStep - 1 ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.05)'),
                                                color: index <= currentStep - 1 ? '#ffffff' : '#cbd5e1',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <step.icon size={20} />
                                            </div>
                                            <span style={{ fontSize: '10px', fontWeight: '900', color: index <= currentStep - 1 ? '#1e293b' : '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Logistics Split */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                                <div className="elite-card" style={{ ...cardStyle, marginBottom: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                                        <div style={{ width: '48px', height: '48px', background: '#f0f7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f3d91' }}>
                                            <FiTruck size={24} />
                                        </div>
                                        <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f3d91', textTransform: 'uppercase', margin: 0, letterSpacing: '0.1em' }}>Logistics Hub</h3>
                                    </div>
                                    <div style={{ paddingLeft: '4px' }}>
                                        <p style={{ ...headerLabelStyle, color: '#94a3b8', fontSize: '10px', marginBottom: '12px' }}>Consignee Identity</p>
                                        <p style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', marginBottom: '32px', letterSpacing: '-0.02em' }}>{order.user?.name || (order.shippingAddress && order.shippingAddress.name)}</p>
                                        
                                        <p style={{ ...headerLabelStyle, color: '#94a3b8', fontSize: '10px', marginBottom: '12px' }}>Destination Protocol</p>
                                        <div style={{ fontSize: '17px', fontWeight: '700', color: '#475569', lineHeight: '1.8' }}>
                                            <p style={{ margin: 0 }}>{order.shippingAddress?.address}</p>
                                            <p style={{ margin: 0 }}>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                            <div style={{ marginTop: '16px', display: 'inline-block', background: '#0f3d91', color: '#fff', padding: '6px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>{order.shippingAddress?.country}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="elite-card" style={{ ...cardStyle, marginBottom: 0, position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: '6px', height: '100%', background: order.isDelivered ? '#10b981' : '#0f3d91' }}></div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                                        <div style={{ width: '48px', height: '48px', background: '#f0f7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f3d91' }}>
                                            <FiShield size={24} />
                                        </div>
                                        <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f3d91', textTransform: 'uppercase', margin: 0, letterSpacing: '0.1em' }}>Fiscal Intelligence</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '4px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            <span>Subtotal Archive</span>
                                            <span style={{ color: '#1e293b' }}>${order.itemsPrice?.toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            <span>Logistic Tariff</span>
                                            <span style={{ color: '#1e293b' }}>${order.shippingPrice?.toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            <span>Statutory Levy</span>
                                            <span style={{ color: '#1e293b' }}>${order.taxPrice?.toFixed(2)}</span>
                                        </div>
                                        <div style={{ marginTop: '24px', paddingTop: '32px', borderTop: '2px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Invoice Total</span>
                                            <span style={{ fontSize: '38px', fontWeight: '900', color: '#0f3d91', lineHeight: '0.8', letterSpacing: '-0.03em' }}>${order.totalPrice?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory Manifest */}
                            <div className="elite-card" style={{ ...cardStyle }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0f3d91', textTransform: 'uppercase', margin: 0, letterSpacing: '0.1em' }}>Inaugurated Inventory</h3>
                                    <div style={{ background: '#f8fafc', padding: '10px 24px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', color: '#94a3b8', border: '1px solid #f1f5f9', textTransform: 'uppercase' }}>{order.orderItems.length} DISTINCT ASSETS</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} className="manifest-item" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center', paddingBottom: index !== order.orderItems.length - 1 ? '40px' : 0, borderBottom: index !== order.orderItems.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                                            <div style={{ width: '120px', height: '120px', background: '#ffffff', borderRadius: '24px', padding: '16px', border: '1px solid #f1f5f9', flexShrink: 0, boxShadow: '0 8px 20px -10px rgba(0,0,0,0.1)' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: '280px' }}>
                                                <Link href={`/product/${item.product}`} style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', textDecoration: 'none', display: 'block', marginBottom: '16px', lineHeight: '1.3', letterSpacing: '-0.02em', transition: 'color 0.2s' }} className="hover-blue">
                                                    {item.name}
                                                </Link>
                                                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                                                    <div>
                                                        <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.1em' }}>Quantity</span>
                                                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>{item.qty} UNITS</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.1em' }}>Unit Rate</span>
                                                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>${item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right', minWidth: '140px' }}>
                                                 <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.1em' }}>Line Yield</span>
                                                 <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f3d91', letterSpacing: '-0.02em' }}>${(item.qty * item.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reference Ledger Footer */}
                            <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '20px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', border: '1px dashed #cbd5e1', borderRadius: '16px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Digital Registry Authentication ID:</span>
                                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#1e293b', fontFamily: 'monospace' }}>{order._id}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05); }
                .hover-blue:hover { color: #0f3d91 !important; }
                
                @media (max-width: 768px) {
                    .elite-card { padding: 32px 24px !important; border-radius: 28px !important; }
                    .manifest-item { gap: 24px !important; }
                    .registry-container { padding: 0 16px !important; }
                }
                
                @media (max-width: 480px) {
                    .elite-card { padding: 24px 16px !important; }
                    .manifest-item { text-align: center; justify-content: center; }
                    .manifest-item > div { text-align: center !important; }
                }
            `}</style>
        </div>
    );
};

export default OrderDetails;



