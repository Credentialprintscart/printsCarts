'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { listMyOrders } from '../redux/actions/orderActions';

const MyOrders = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            router.push('/signin');
        } else {
            dispatch(listMyOrders());
        }
        window.scrollTo(0, 0);
    }, [dispatch, router, userInfo]);

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            
            <main style={{ paddingTop: '100px', paddingBottom: '120px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    
                    {/* PAGE HUB CONTAINER */}
                    <div style={{ background: '#ffffff', borderRadius: '32px', boxShadow: '0 4px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                        
                        {/* HEADER SECTION */}
                        <div style={{ padding: '40px 48px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px' }}>Order History</h1>
                                <p style={{ fontSize: '15px', color: '#64748b', fontWeight: '500', margin: 0 }}>View and track all your previous purchases</p>
                            </div>
                            <div style={{ color: '#e2e8f0' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                                    <path d="M12 22V12"></path>
                                </svg>
                            </div>
                        </div>

                        {/* DATA WORKSTATION */}
                        <div style={{ padding: '0 48px 48px' }}>
                            {loading ? (
                                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                    <div className="hq-loader" style={{ width: '40px', height: '40px', border: '4px solid #f1f5f9', borderTop: '4px solid #0f3d91', borderRadius: '50%', margin: '0 auto' }}></div>
                                    <p style={{ marginTop: '20px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Accessing Records...</p>
                                </div>
                            ) : error ? (
                                <div style={{ padding: '40px', textAlign: 'center' }}>
                                    <p style={{ color: '#ef4444', fontWeight: '600' }}>{error}</p>
                                    <button onClick={() => dispatch(listMyOrders())} style={{ background: '#0f3d91', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer' }}>Retry Sync</button>
                                </div>
                            ) : !orders || orders.length === 0 ? (
                                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                    <p style={{ fontSize: '16px', color: '#64748b', fontWeight: '500' }}>No historical data registered for this account.</p>
                                    <Link href="/printers" style={{ color: '#0f3d91', fontWeight: '700', textDecoration: 'none' }}>Exlore asset registry →</Link>
                                </div>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: '32px 0 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order ID</th>
                                                <th style={{ padding: '32px 0 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</th>
                                                <th style={{ padding: '32px 0 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</th>
                                                <th style={{ padding: '32px 0 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Status</th>
                                                <th style={{ padding: '32px 0 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice().reverse().map((order) => (
                                                <tr key={order._id} style={{ borderTop: '1px solid #f8fafc' }}>
                                                    <td style={{ padding: '24px 0', fontSize: '15px', fontWeight: '500', color: '#64748b' }}>
                                                        #{(order._id || '').slice(-6).toLowerCase()}
                                                    </td>
                                                    <td style={{ padding: '24px 0' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '15px', fontWeight: '500' }}>
                                                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y1="6"></line><line x1="8" y1="2" x2="8" y1="6"></line><line x1="3" y1="10" x2="21" y1="10"></line></svg>
                                                             {new Date(order.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '24px 0', fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>
                                                        ${order.totalPrice.toFixed(2)}
                                                    </td>
                                                    <td style={{ padding: '24px 0', textAlign: 'center' }}>
                                                        <span style={{ 
                                                            display: 'inline-block', padding: '4px 14px', borderRadius: '100px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em',
                                                            background: (order.status || '').toLowerCase().includes('failed') ? '#fff1f2' : (order.isPaid ? '#f0fdf4' : '#fff7ed'),
                                                            color: (order.status || '').toLowerCase().includes('failed') ? '#be123c' : (order.isPaid ? '#16a34a' : '#c2410c')
                                                        }}>
                                                            {order.status || (order.isPaid ? 'Paid' : 'Pending')}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '24px 0', textAlign: 'right' }}>
                                                        <Link href={`/order/${order._id}`} style={{ fontSize: '15px', fontWeight: '800', color: '#024ad8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                            Details 
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            
            <style>{`
                .hq-loader { animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @media (max-width: 600px) {
                    th:nth-child(2), td:nth-child(2) { display: none; }
                }
            `}</style>
        </div>
    );
};

export default MyOrders;


