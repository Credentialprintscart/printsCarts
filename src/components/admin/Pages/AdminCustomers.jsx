'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Users,
    Search,
    Shield,
    ShieldOff,
    Mail,
    ShoppingBag,
    Trash2,
    X,
    AlertTriangle
} from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmModal, setConfirmModal] = useState({ show: false, type: '', userId: null, userName: '' });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const fetchCustomers = async (pageNum = 1, append = false, search = '') => {
        if (!userInfo) return;

        try {
            setLoading(true);
            setError(null);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
            const { data: userData } = await axios.get(`${baseUrl}/auth/users?page=${pageNum}&search=${search}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            
            const users = userData.users || (Array.isArray(userData) ? userData : []);
            const fetchedPages = userData.pages || 1;
            const count = userData.count || users.length;

            // Fetch orders to calculate customer stats
            const { data: orderData } = await axios.get(`${baseUrl}/orders?fetchAll=true`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            const orders = orderData.orders || (Array.isArray(orderData) ? orderData : []);
            
            const customersWithStats = users.filter(user => !user.isAdmin).map(user => {
                const userOrders = orders.filter(order => order.user && (order.user._id === user._id || order.user === user._id));
                const totalSpent = userOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
                const totalItems = userOrders.reduce((acc, order) =>
                    acc + (order.orderItems ? order.orderItems.reduce((sum, item) => sum + (item.qty || 0), 0) : 0), 0
                );

                return {
                    ...user,
                    totalOrders: userOrders.length,
                    totalSpent: totalSpent,
                    totalItems: totalItems,
                    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                    })
                };
            });

            if (append) {
                 setCustomers(prev => [...prev, ...customersWithStats]);
            } else {
                 setCustomers(customersWithStats);
            }
            setTotalPages(fetchedPages);
            setTotalCustomers(count);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo) {
            const delaySearch = setTimeout(() => {
                setPage(1);
                fetchCustomers(1, false, searchTerm);
            }, 500);
            return () => clearTimeout(delaySearch);
        }
    }, [userInfo, searchTerm]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchCustomers(nextPage, true, searchTerm);
        }
    };

    const handleDeleteUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'delete', userId, userName: user?.name || 'this user' });
    };

    const handleBlockUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'block', userId, userName: user?.name || 'this user' });
    };

    const handleUnblockUser = async (userId) => {
        const user = customers.find(c => c._id === userId);
        setConfirmModal({ show: true, type: 'unblock', userId, userName: user?.name || 'this user' });
    };

    const handleConfirm = async () => {
        if (!userInfo) return;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        
        try {
            if (confirmModal.type === 'delete') {
                await axios.delete(`${baseUrl}/auth/users/${confirmModal.userId}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
            } else if (confirmModal.type === 'block') {
                await axios.put(`${baseUrl}/auth/users/${confirmModal.userId}/block`, {}, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
            } else if (confirmModal.type === 'unblock') {
                await axios.put(`${baseUrl}/auth/users/${confirmModal.userId}/unblock`, {}, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
            }
            setConfirmModal({ show: false, type: '', userId: null, userName: '' });
            fetchCustomers(page, false, searchTerm);
        } catch (err) {
            alert(err.response?.data?.message || `Operation ${confirmModal.type} failed`);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-blue-100/50 duration-500"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">User Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Customer <span className="text-blue-600">Directory</span></h1>
                    <p className="text-slate-500 font-medium mt-1">Manage entity permissions and operational access.</p>
                </div>
                <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Entity, Email, UID..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Customers Table Section */}
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="font-black text-xl text-slate-900 tracking-tight">Registered Entities</h2>
                        <p className="text-slate-400 text-xs font-medium mt-1">Total {totalCustomers} profiles identified in cluster.</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Users size={24} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1100px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Entity Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Communications</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction Vol.</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Yield</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Payload Weight</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Level</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operational Logic</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && page === 1 ? (
                                <tr><td colSpan="7" className="py-24 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Processing Node Data...</p>
                                    </div>
                                </td></tr>
                            ) : error ? (
                                <tr><td colSpan="7" className="py-24 text-center text-red-500 font-black uppercase tracking-widest text-xs italic">{error}</td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan="7" className="py-24 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">No matching entities found in current vector.</td></tr>
                            ) : customers.map((customer) => (
                                <tr key={customer._id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-sm shadow-inner group-hover:scale-110 transition-transform">
                                                {(customer.name || 'U').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{customer.name || 'Anonymous Entity'}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">UID: {customer._id ? customer._id.substring(customer._id.length - 8).toUpperCase() : 'EXTERNAL'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 lowercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <Mail size={12} className="text-blue-400" /> {customer.email || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag size={14} className="text-slate-400" />
                                            <span className="font-black text-slate-900 text-sm">{customer.totalOrders || 0} Records</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-black text-slate-900 text-base tracking-tighter">${(customer.totalSpent || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">NET REVENUE</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs border border-blue-100 shadow-sm">
                                                {customer.totalItems || 0}
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {customer.isBlocked ? (
                                            <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 border-2 border-red-100 shadow-sm animate-pulse">
                                                <ShieldOff size={12} className="mr-2" /> Restricted
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border-2 border-emerald-100 shadow-sm">
                                                <Shield size={12} className="mr-2" /> Authorized
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            {customer.isBlocked ? (
                                                <button
                                                    onClick={() => handleUnblockUser(customer._id)}
                                                    className="p-3 rounded-xl transition-all border-2 bg-white text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white shadow-sm active:scale-90"
                                                    title="Restore Authorization"
                                                >
                                                    <Shield size={18} strokeWidth={2.5} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlockUser(customer._id)}
                                                    className="p-3 rounded-xl transition-all border-2 bg-white text-orange-600 border-orange-100 hover:bg-orange-600 hover:text-white shadow-sm active:scale-90"
                                                    title="Revoke Authorization"
                                                >
                                                    <ShieldOff size={18} strokeWidth={2.5} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteUser(customer._id)}
                                                className="p-3 rounded-xl transition-all border-2 bg-white text-red-600 border-red-100 hover:bg-red-600 hover:text-white shadow-sm active:scale-90"
                                                title="Purge Profile"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {loading && page > 1 && (
                    <div className="p-8 border-t border-slate-50 flex justify-center sticky bottom-0 bg-white/95 backdrop-blur-md z-10 gap-3">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Retrieving More Nodes...</span>
                    </div>
                )}

                {(page < totalPages) && !loading && (
                    <div className="p-10 border-t border-slate-50 flex justify-center bg-slate-50/30">
                        <button 
                            onClick={handleLoadMore}
                            className="px-10 py-4 bg-white text-slate-900 hover:bg-slate-900 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 border border-slate-200 active:scale-95 flex items-center gap-3"
                        >
                           Expand Directory
                           <Users size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-xl animate-in fade-in duration-300 p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
                        <div className={`px-10 py-10 text-white relative overflow-hidden ${confirmModal.type === 'delete' ? 'bg-red-600' : confirmModal.type === 'block' ? 'bg-orange-600' : 'bg-emerald-600'}`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="relative z-10 flex justify-between items-center">
                                <h3 className="text-2xl font-black tracking-tight uppercase">System Logic</h3>
                                <button onClick={() => setConfirmModal({ ...confirmModal, show: false })} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className={`p-5 rounded-3xl ${confirmModal.type === 'delete' ? 'bg-red-50 text-red-600' : confirmModal.type === 'block' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    <AlertTriangle size={40} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Confirm {confirmModal.type} operation?</h4>
                                    <p className="text-slate-500 font-medium text-sm mt-2 leading-relaxed">
                                        Executing this logic will {confirmModal.type} <strong>{confirmModal.userName}</strong>. This is a secure operation.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleConfirm}
                                    className={`w-full py-5 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 ${confirmModal.type === 'delete' ? 'bg-red-600 shadow-red-900/10' : confirmModal.type === 'block' ? 'bg-orange-600 shadow-orange-900/10' : 'bg-emerald-600 shadow-emerald-900/10'}`}
                                >
                                    Proceed with {confirmModal.type}
                                </button>
                                <button 
                                    onClick={() => setConfirmModal({ ...confirmModal, show: false })}
                                    className="w-full py-5 bg-slate-50 text-slate-500 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-100 transition-all"
                                >
                                    Abort Operation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCustomers;
