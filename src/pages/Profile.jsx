'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo: user } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 000-0000',
        address: user?.address || '123 Business Ave, Suite 100, New York, NY 10001'
    });

    useEffect(() => {
        if (!user) {
            router.push('/signin');
        } else {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '+1 (555) 000-0000',
                address: user.address || '123 Business Ave, Suite 100, New York, NY 10001'
            });
            dispatch(listMyOrders());
        }
    }, [user, router, dispatch]);

    if (!user) return null;

    const handleSignOut = () => {
        dispatch(logout());
        router.push('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        // Dispatch update action here if implemented
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            
            <main style={{ paddingTop: '140px', paddingBottom: '160px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '48px', alignItems: 'flex-start' }} className="profile-layout">
                    
                    {/* LEFT: EXECUTIVE SIDEBAR */}
                    <aside style={{ width: '300px', background: '#ffffff', borderRadius: '32px', border: '1px solid #f1f5f9', padding: '48px 32px', position: 'sticky', top: '120px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#0f3d91', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '900', margin: '0 auto 24px' }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 4px' }}>{user.name}</h2>
                            <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{user.email}</p>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { id: 'profile', label: 'Profile', icon: '👤' },
                                { id: 'orders', label: 'My Orders', icon: '📋' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none', background: activeTab === tab.id ? '#fcfdfe' : 'transparent',
                                        color: activeTab === tab.id ? '#0f3d91' : '#64748b', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
                                        textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.3s ease',
                                        border: activeTab === tab.id ? '1.5px solid #0f3d91' : '1.5px solid transparent'
                                    }}
                                >
                                    <span style={{ fontSize: '18px' }}>{tab.icon}</span> {tab.label}
                                </button>
                            ))}
                            <button onClick={handleSignOut} style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none', background: 'transparent', color: '#be123c', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px' }}>
                                <span>🚪</span> Logout
                            </button>
                        </nav>
                    </aside>

                    {/* RIGHT: MAIN TERMINAL CONTENT */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {activeTab === 'profile' && (
                            <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px', border: '1px solid #f1f5f9', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                                    <div>
                                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Authentication Node</span>
                                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0' }}>Credential Registry</h2>
                                    </div>
                                    <button 
                                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                        style={{ padding: '14px 28px', background: isEditing ? '#0f3d91' : '#f8fafc', color: isEditing ? '#ffffff' : '#0f3d91', border: 'none', borderRadius: '14px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease' }}
                                    >
                                        {isEditing ? 'Confirm Updates' : 'Revise Credentials'}
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Full Name</label>
                                        {isEditing ? (
                                            <input name="name" value={formData.name} onChange={handleInputChange} style={{ padding: '18px 24px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: '600', outline: 'none' }} />
                                        ) : (
                                            <div style={{ padding: '18px 24px', background: '#f8fafc', borderRadius: '16px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{user.name}</div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Email Secure</label>
                                        <div style={{ padding: '18px 24px', background: '#f8fafc', borderRadius: '16px', fontSize: '16px', fontWeight: '800', color: '#0f172a', opacity: 0.7 }}>{user.email}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Access Tier</label>
                                        <div style={{ padding: '18px 24px', background: '#f0f4ff', borderRadius: '16px', fontSize: '16px', fontWeight: '900', color: '#0f3d91', textTransform: 'capitalize' }}>{user.role || 'Partner'}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Member Since</label>
                                        <div style={{ padding: '18px 24px', background: '#f8fafc', borderRadius: '16px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{new Date(user.createdAt || Date.now()).getFullYear()} Registry</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div style={{ background: '#ffffff', borderRadius: '32px', padding: '60px', border: '1px solid #f1f5f9', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                                    <div>
                                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Procurement Logs</span>
                                        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0' }}>Order History</h2>
                                    </div>
                                    <div style={{ color: '#0f3d91', fontSize: '12px', fontWeight: '900', background: '#f0f4ff', padding: '8px 16px', borderRadius: '100px' }}>Total Records: {orders?.length || 0}</div>
                                </div>

                                {loadingOrders ? (
                                    <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                        <div className="hq-loader" style={{ width: '40px', height: '40px', border: '4px solid #f1f5f9', borderTop: '4px solid #0f3d91', borderRadius: '50%', margin: '0 auto' }}></div>
                                    </div>
                                ) : !orders || orders.length === 0 ? (
                                    <div style={{ padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px' }}>
                                        <p style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8' }}>No recorded asset procurements in this cycle.</p>
                                        <Link href="/printers" style={{ color: '#0f3d91', fontWeight: '900', textDecoration: 'none', textTransform: 'uppercase', fontSize: '12px', marginTop: '16px', display: 'block' }}>Search Asset hub →</Link>
                                    </div>
                                ) : (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                                    <th style={{ padding: '16px 0', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Registry ID</th>
                                                    <th style={{ padding: '16px 0', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Placed Date</th>
                                                    <th style={{ padding: '16px 0', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Total</th>
                                                    <th style={{ padding: '16px 0', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                                                    <th style={{ padding: '16px 0', fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Action Hub</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(order => (
                                                    <tr key={order._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                                        <td style={{ padding: '24px 0', fontSize: '13px', fontWeight: '800', color: '#0f3d91', fontFamily: 'monospace' }}>#{(order._id || '').slice(-8).toUpperCase()}</td>
                                                        <td style={{ padding: '24px 0', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                        <td style={{ padding: '24px 0', fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>${order.totalPrice.toFixed(2)}</td>
                                                        <td style={{ padding: '24px 0' }}>
                                                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '100px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', background: (order.status || '').toLowerCase().includes('failed') ? '#fff1f2' : (order.isPaid ? '#f0fdf4' : '#fffbeb'), color: (order.status || '').toLowerCase().includes('failed') ? '#be123c' : (order.isPaid ? '#16a34a' : '#c2410c') }}>
                                                                {order.status || (order.isPaid ? 'Paid' : 'Unverified')}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '24px 0', textAlign: 'right' }}>
                                                            <Link href={`/order/${order._id}`} style={{ padding: '10px 20px', background: '#0f3d91', color: '#ffffff', borderRadius: '12px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }} className="view-details-btn">View Details</Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            
            <style>{`
                .hq-loader { animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @media (max-width: 900px) {
                    .profile-layout { flex-direction: column; }
                    aside { width: 100% !important; position: static !important; }
                    .main-content { padding: 40px 24px !important; }
                }
            `}</style>
        </div>
    );
};

export default Profile;


