'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Search,
    ShoppingBag,
    MoreHorizontal,
    MapPin,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    X,
    User,
    CreditCard,
    DollarSign,
    Package,
    ChevronRight,
    Eye,
    Settings,
    LayoutDashboard,
    ExternalLink
} from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const fetchOrders = async (pageNum = 1, append = false, search = '') => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders?page=${pageNum}&search=${search}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            
            const newOrders = Array.isArray(data) ? data : data.orders;
            const newPages = Array.isArray(data) ? 1 : data.pages;
            const count = Array.isArray(data) ? data.length : data.count;

            if (append) {
                setOrders(prev => [...prev, ...newOrders]);
            } else {
                setOrders(newOrders);
            }
            setTotalPages(newPages);
            setTotalOrders(count);
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
                fetchOrders(1, false, searchTerm);
            }, 500);
            return () => clearTimeout(delaySearch);
        }
    }, [userInfo, searchTerm]);

    const handleLoadMore = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchOrders(nextPage, true, searchTerm);
        }
    };

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    const [updateForm, setUpdateForm] = useState({
        status: '',
        currentLocation: '',
        estTime: ''
    });

    const statusColors = {
        'Processing': 'bg-blue-50 text-blue-700 border-blue-100',
        'Shipped': 'bg-purple-50 text-purple-700 border-purple-100',
        'Out for Delivery': 'bg-amber-50 text-amber-700 border-amber-200',
        'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Cancelled': 'bg-red-50 text-red-700 border-red-100',
        'Failed': 'bg-red-50 text-red-700 border-red-100',
    };

    const handleOpenUpdate = (order) => {
        setSelectedOrder(order);
        setUpdateForm({
            status: order.status || 'Processing',
            currentLocation: order.tracking?.currentLocation || 'Warehouse',
            estTime: order.tracking?.estTime || '3-5 Days'
        });
        setIsUpdateModalOpen(true);
    };

    const handleOpenPayment = (order) => {
        setSelectedOrder(order);
        setIsPaymentModalOpen(true);
    };

    const handleOpenItems = (order) => {
        setSelectedOrder(order);
        setIsItemsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
            await axios.put(`${baseUrl}/orders/${selectedOrder._id}/status`, updateForm, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            fetchOrders(page, false, searchTerm);
            setIsUpdateModalOpen(false);
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Order Management
                        <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest shadow-lg shadow-blue-600/20">Active Queue</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm">Monitor and fulfill global customer demands.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search Reference, Entity..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-bold text-sm shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Live Stream
                    </div>
                </div>
            </div>

            {/* Orders Repository Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                    <div>
                        <h2 className="font-black text-xl text-slate-900 tracking-tight">Active Transactions</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{totalOrders} records currently being processed.</p>
                    </div>
                    <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/10">
                        <ShoppingBag size={22} strokeWidth={2.5} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reference</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Entity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Revenue</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Logistics Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Payload</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && page === 1 ? (
                                <tr><td colSpan="6" className="py-32 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse italic">Synchronizing Data Nodes...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan="6" className="py-32 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">Transaction Registry Empty</td></tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className={`hover:bg-slate-50/80 transition-all duration-300 group ${!order.isPaid ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent'}`}>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="font-black text-sm text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                                #{order._id.substring(order._id.length - 8).toUpperCase()}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform">
                                                {(order.user?.name || 'Guest').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-sm text-slate-900 tracking-tight">{order.user?.name || 'Guest Checkout'}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{order.user?.email || 'System Account'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-lg text-slate-900 tabular-nums">${order.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <CreditCard size={12} className={order.isPaid ? 'text-emerald-500' : 'text-red-400'} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${order.isPaid ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {order.isPaid ? 'Settled' : 'Unpaid'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusColors[order.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <button 
                                            onClick={() => handleOpenItems(order)}
                                            className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest shadow-sm active:scale-90"
                                        >
                                            {order.orderItems?.length || 0} Units
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleOpenUpdate(order)}
                                                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 group/edit"
                                                title="Logistics Configuration"
                                            >
                                                <Truck size={18} className="group-hover/edit:translate-x-1 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => handleOpenPayment(order)}
                                                className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90 group/pay"
                                                title="Financial Details"
                                            >
                                                <DollarSign size={18} className="group-hover/pay:scale-110 transition-transform" />
                                            </button>
                                            <div className="w-10 h-10 flex items-center justify-center text-slate-200 group-hover:text-slate-400 transition-colors">
                                                <ChevronRight size={20} />
                                            </div>
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
                        <span className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Fetching Transactions...</span>
                    </div>
                )}

                {page < totalPages && !loading && (
                    <div className="p-10 border-t border-slate-50 flex justify-center bg-slate-50/30">
                        <button 
                            onClick={handleLoadMore}
                            className="px-10 py-4 bg-slate-900 text-white hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
                        >
                           Expand Archives
                           <Plus size={16} strokeWidth={3} />
                        </button>
                    </div>
                )}
            </div>

            {/* Logistics Update Modal */}
            {isUpdateModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsUpdateModalOpen(false)}></div>
                    <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="p-8 bg-slate-900 flex justify-between items-center text-white">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                    <Truck size={24} className="text-blue-400" /> Logistics Core
                                </h2>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Ref: {selectedOrder._id.toUpperCase()}</p>
                            </div>
                            <button onClick={() => setIsUpdateModalOpen(false)} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-10 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payload Status</label>
                                <select
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all appearance-none shadow-sm"
                                >
                                    {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Geolocation</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={updateForm.currentLocation}
                                        onChange={(e) => setUpdateForm({ ...updateForm, currentLocation: e.target.value })}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all shadow-sm"
                                        placeholder="e.g. Processing Center, JFK Airport"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estimated Logistics ETA</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={updateForm.estTime}
                                        onChange={(e) => setUpdateForm({ ...updateForm, estTime: e.target.value })}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all shadow-sm"
                                        placeholder="e.g. 2-3 Business Days"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <CheckCircle size={20} />
                                Synchronize Logistics
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Payment & Items Modals would be updated similarly to match the professional look */}
        </div>
    );
};

export default AdminOrders;
