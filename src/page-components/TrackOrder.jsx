'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { 
    FiSearch, FiPackage, FiTruck, FiMapPin, 
    FiCheckCircle, FiAlertCircle, FiUser, 
    FiShoppingCart, FiCreditCard,
    FiClock, FiChevronRight, FiFileText
} from "react-icons/fi";

const TrackOrder = () => {
    const searchParams = useSearchParams();
    const urlId = searchParams.get('id');

    const [orderId, setOrderId] = useState(urlId || "");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (urlId) {
            handleTrack(null, urlId);
        }
    }, [urlId]);

    const handleTrack = async (e, idOverride) => {
        if (e) e.preventDefault();
        const idToUse = idOverride || orderId;
        const cleanId = idToUse.replace('#', '').replace('ORD-', '').trim();
        if (!cleanId) return;

        try {
            setLoading(true);
            setError(null);
            setOrder(null);
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${cleanId}`);
            setOrder(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Order not found. Please check your Order ID.");
            setLoading(false);
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Out for Delivery': return 3;
            case 'Delivered': return 4;
            default: return 0; 
        }
    };

    const steps = [
        { label: 'Authorized', icon: FiCheckCircle, desc: 'Order received' },
        { label: 'Processing', icon: FiPackage, desc: 'Preparing items' },
        { label: 'Shipped', icon: FiTruck, desc: 'Carrier in transit' },
        { label: 'Delivered', icon: FiShoppingCart, desc: 'Package arrived' },
    ];

    const getRealStatus = (order) => {
        if (order.status === 'Failed' || (!order.isPaid && order.paymentMethod !== 'Cash on Delivery' && !order.isPaid)) {
            return { label: 'Payment Error / Order Suspended', color: '#ef4444', bg: '#fef2f2', icon: <FiAlertCircle /> };
        }
        if (order.isDelivered) {
            return { label: 'Delivered Successfully', color: '#10b981', bg: '#ecfdf5', icon: <FiCheckCircle /> };
        }
        return { label: order.status || 'Manifest Processing', color: '#0f3d91', bg: '#eff6ff', icon: <FiClock /> };
    };

    const realStatus = order ? getRealStatus(order) : null;
    const currentStep = order ? getStatusStep(order.status) : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
            
            
            <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    
                    {/* Centered Executive Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Track Your Order</h1>
                        <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
                        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>
                            Monitor your high-performance printing equipment as it moves to your destination.
                        </p>
                    </div>

                    {/* Centered Search Console */}
                    <div style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ flex: '1', display: 'flex', alignItems: 'center', padding: '0 16px', minWidth: '250px' }}>
                                <FiSearch style={{ color: '#94a3b8', marginRight: '12px' }} />
                                <input 
                                    type="text"
                                    placeholder="Enter Manifest Reference ID..."
                                    style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleTrack(e)}
                                />
                            </div>
                            <button 
                                onClick={(e) => handleTrack(e)}
                                disabled={loading || !orderId.trim()}
                                style={{ padding: '14px 40px', background: '#0f3d91', color: '#ffffff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                {loading ? "Querying..." : "Locate Shipment"}
                            </button>
                        </div>
                    </div>

                    {/* Error State Centered */}
                    {error && (
                        <div style={{ maxWidth: '700px', margin: '0 auto 40px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#991b1b' }}>
                            <FiAlertCircle size={32} style={{ marginBottom: '12px' }} />
                            <h3 style={{ fontWeight: '800', marginBottom: '8px' }}>Locate Failed</h3>
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>{error}</p>
                        </div>
                    )}

                    {/* Results Centered */}
                    {order && (
                        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ background: '#ffffff', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: '40px' }}>
                                <div style={{ padding: '40px', borderBottom: '1px solid #f8fafc', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f3d91', border: '1px solid #f1f5f9' }}>
                                            <FiFileText size={32} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Manifest ID</p>
                                            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>#{order._id.slice(-8).toUpperCase()}</h2>
                                        </div>
                                    </div>
                                    <div style={{ background: realStatus.bg, color: realStatus.color, padding: '12px 32px', borderRadius: '16px', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid currentColor' }}>
                                        {realStatus.label}
                                    </div>
                                </div>

                                {/* Progress Stepper */}
                                <div style={{ padding: '60px 40px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '24px', left: '0', right: '0', height: '4px', background: '#f1f5f9', zIndex: '0' }}>
                                            <div style={{ height: '100%', background: '#0f3d91', width: `${(currentStep > 0 ? (currentStep / steps.length) * 100 : 0)}%`, transition: 'width 1s ease' }}></div>
                                        </div>
                                        {steps.map((step, idx) => {
                                            const isDone = idx < currentStep;
                                            return (
                                                <div key={idx} style={{ position: 'relative', zIndex: '1', textAlign: 'center', width: '25%' }}>
                                                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: isDone ? '#0f3d91' : '#ffffff', border: '4px solid #f8fafc', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? '#ffffff' : '#cbd5e1', boxShadow: isDone ? '0 10px 15px -3px rgba(15,61,145,0.3)' : 'none' }}>
                                                        <step.icon size={20} />
                                                    </div>
                                                    <h4 style={{ fontSize: '11px', fontWeight: '900', color: isDone ? '#1e293b' : '#cbd5e1', textTransform: 'uppercase' }}>{step.label}</h4>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
                                <div style={{ background: '#ffffff', padding: '32px', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f3d91', marginBottom: '24px', textTransform: 'uppercase' }}>Logistics Intelligence</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Recipient</p>
                                            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{order.user?.name || order.shippingAddress?.name}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Destination</p>
                                            <p style={{ fontSize: '14px', fontWeight: '500', color: '#475569', lineHeight: '1.6' }}>
                                                {order.shippingAddress.address}<br />
                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                                {order.shippingAddress.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ background: '#0f3d91', padding: '32px', borderRadius: '32px', color: '#ffffff' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff', marginBottom: '24px', textTransform: 'uppercase' }}>Fiscal Summary</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>
                                            <span>Revenue Subtotal</span>
                                            <span style={{ color: '#ffffff' }}>${order.itemsPrice.toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>
                                            <span>Taxation Duty</span>
                                            <span style={{ color: '#ffffff' }}>${order.taxPrice.toFixed(2)}</span>
                                        </div>
                                        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '16px', fontWeight: '800' }}>Gross Total</span>
                                            <span style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff' }}>${order.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            
        </div>
    );
};

export default TrackOrder;


