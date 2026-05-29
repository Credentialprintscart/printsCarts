'use client';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeFromCart, addToCart } from "../redux/actions/cartActions";
import { FiTrash2, FiShoppingBag, FiTruck, FiShield, FiArrowRight, FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const [giftWrap, setGiftWrap] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalWithGift = subtotal + (giftWrap ? 10 : 0);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        router.push('/signin?redirect=checkout');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
            
            <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    
                    {/* Centered Executive Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#0f3d91', marginBottom: '16px', textTransform: 'uppercase' }}>Shopping Hub</h1>
                        <div style={{ width: '80px', height: '4px', background: '#0a3382', margin: '0 auto 24px', borderRadius: '2px' }}></div>
                        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto', fontWeight: '500' }}>
                            View and manage your professional hardware inventory before securing your purchase.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', background: '#f8fafc', padding: '80px 40px', borderRadius: '40px', border: '1px dashed #cbd5e1' }}>
                            <FiShoppingBag size={64} style={{ color: '#cbd5e1', marginBottom: '24px' }} />
                            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginBottom: '16px' }}>Your Manifest is Empty</h2>
                            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px', lineHeight: '1.6' }}>
                                Ready to optimize your workflow? Browse our professional hardware collection to begin.
                            </p>
                            <Link 
                                href="/printers" 
                                style={{ background: '#0f3d91', color: '#ffffff', padding: '16px 40px', borderRadius: '16px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                            >
                                Browse Corporate Inventory <FiArrowRight />
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'start' }}>
                            {/* Left: Items */}
                            <div style={{ background: '#ffffff', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ padding: '32px', borderBottom: '1px solid #f8fafc', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '12px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', margin: 0 }}>Inventory Manifesto</h3>
                                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#0f3d91', background: '#ffffff', padding: '6px 12px', borderRadius: '8px' }}>{cartItems.length} DISTINCT ITEMS</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {cartItems.map((item) => (
                                        <div key={item.product} style={{ padding: '32px', borderBottom: '1px solid #f8fafc', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                            <div style={{ width: '100px', height: '100px', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '12px', flexShrink: 0 }}>
                                                <img 
                                                    src={item.image ? (item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || ''}${item.image}`) : "/placeholder.png"} 
                                                    alt={item.title} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div style={{ flex: 1, minWidth: '200px' }}>
                                                <Link href={`/product/${item.slug}`} style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
                                                    {item.title}
                                                </Link>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                                                    <p style={{ fontSize: '18px', fontWeight: '900', color: '#0f3d91', margin: 0 }}>${item.price.toLocaleString()}</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', padding: '4px' }}>
                                                        <button 
                                                            disabled={item.qty <= 1}
                                                            onClick={() => dispatch(addToCart(item.product, Math.max(1, Number(item.qty) - 1)))}
                                                            style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
                                                        ><FiMinus size={14} /></button>
                                                        <span style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', width: '40px', textAlign: 'center' }}>{item.qty}</span>
                                                        <button 
                                                            onClick={() => dispatch(addToCart(item.product, Math.min(item.countInStock || 99, Number(item.qty) + 1)))}
                                                            style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
                                                        ><FiPlus size={14} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCartHandler(item.product)}
                                                style={{ padding: '12px', background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', height: 'fit-content' }}
                                            >
                                                <FiTrash2 size={24} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Summary */}
                            <div style={{ background: '#ffffff', borderRadius: '40px', border: '1px solid #f1f5f9', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f3d91', marginBottom: '32px', textTransform: 'uppercase' }}>Fiscal Intelligence</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700', color: '#64748b' }}>
                                        <span>REVENUE SUBTOTAL</span>
                                        <span style={{ color: '#1e293b' }}>${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div style={{ paddingTop: '20px', borderTop: '2px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b' }}>INVOICE TOTAL</span>
                                        <span style={{ fontSize: '36px', fontWeight: '900', color: '#0f3d91', letterSpacing: '-0.02em' }}>${totalWithGift.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={checkoutHandler}
                                    style={{ width: '100%', background: '#0f3d91', color: '#ffffff', padding: '24px', borderRadius: '24px', border: 'none', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(15,61,145,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                                >
                                    Inaugurate Checkout <FiArrowRight />
                                </button>

                                <div style={{ marginTop: '32px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8px', fontWeight: '900', color: '#cbd5e1', textTransform: 'uppercase' }}>
                                        <FiShield /> PCI Compliant
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8px', fontWeight: '900', color: '#cbd5e1', textTransform: 'uppercase' }}>
                                        <FiShield /> SSL Secured
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

export default Cart;
