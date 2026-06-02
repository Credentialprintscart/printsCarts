'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
    DollarSign, 
    ShoppingBag, 
    Users, 
    ArrowUpRight, 
    Calendar,
    CreditCard,
    TrendingUp,
    Clock,
    Activity,
    ArrowDownRight,
    ExternalLink
} from 'lucide-react';
import { fetchAnalytics } from '@/redux/actions/analyticsActions';

const AdminDashboard = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const analyticsState = useSelector((state) => state.analytics || {});
    const { loading, analytics, error } = analyticsState;

    useEffect(() => {
        setMounted(true);
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAnalytics());
        }
    }, [dispatch, userInfo]);

    const statsDisplay = analytics ? [
        {
            label: 'Net Revenue',
            value: `$${analytics.revenue.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: `${analytics.revenue.growth >= 0 ? '+' : ''}${analytics.revenue.growth}%`,
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            borderColor: 'border-emerald-100'
        },
        {
            label: 'Order Volume',
            value: analytics.orders.total.toString(),
            change: `${analytics.orders.growth >= 0 ? '+' : ''}${analytics.orders.growth}%`,
            icon: ShoppingBag,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            label: 'Customer Base',
            value: analytics.customers.total.toString(),
            change: `${analytics.customers.growth >= 0 ? '+' : '-'}${Math.abs(analytics.customers.growth)}%`,
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            borderColor: 'border-purple-100'
        },
    ] : [];

    const statusStyles = {
        'Processing': 'bg-blue-50 text-blue-700 border-blue-100',
        'Shipped': 'bg-purple-50 text-purple-700 border-purple-100',
        'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Cancelled': 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Dashboard Analytics
                        <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest">Live</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm">Welcome back, {userInfo?.name?.split(' ')[0]}! Monitoring system performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 text-xs font-black shadow-sm uppercase tracking-widest">
                        <Calendar size={14} className="text-blue-600" />
                        <span>{mounted ? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '--- --, ----'}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm animate-pulse h-40"></div>
                    ))
                ) : error ? (
                    <div className="col-span-full p-10 bg-red-50 border border-red-100 rounded-[2rem] text-red-600 text-center font-black uppercase tracking-widest flex items-center justify-center gap-3">
                        <Activity size={20} />
                        Synchronization Error: {error}
                    </div>
                ) : statsDisplay.map((stat, i) => (
                    <div key={i} className={`bg-white p-8 rounded-[2.5rem] border ${stat.borderColor} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-white transition-colors"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 shadow-sm`}>
                                    <stat.icon size={26} strokeWidth={2.5} />
                                </div>
                                <span className={`flex items-center text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.change} 
                                    {stat.change.startsWith('+') ? <ArrowUpRight size={12} className="ml-1" /> : <ArrowDownRight size={12} className="ml-1" />}
                                </span>
                            </div>
                            <h3 className="text-4xl font-black text-slate-900 mb-2 tabular-nums tracking-tighter">{stat.value}</h3>
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <div>
                            <h2 className="font-black text-xl text-slate-900 tracking-tight">Recent Orders</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Latest marketplace activity</p>
                        </div>
                        <button 
                            onClick={() => router.push('/admin/orders')} 
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                        >
                            View All <ExternalLink size={12} />
                        </button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Order Ref</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="5" className="py-24 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Syncing...</td></tr>
                                ) : analytics?.recentOrders?.length > 0 ? (
                                    analytics?.recentOrders?.map((order) => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => router.push('/admin/orders')}>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-slate-900 text-sm group-hover:text-blue-600 transition-colors">#{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-800 text-sm leading-tight">{order.user?.name || 'Guest Checkout'}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{order.user?.email || 'System ID: ' + order._id.slice(-4)}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-900 text-sm tabular-nums">${order.totalPrice.toFixed(2)}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${statusStyles[order.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="text-slate-400 font-black text-[10px] uppercase tracking-tighter">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="py-24 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">No records found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Stats & Help */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <h3 className="font-black text-slate-900 mb-8 text-xl tracking-tight">System Status</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Total Volume', value: analytics?.orders.total || 0, icon: CreditCard, color: 'bg-blue-50 text-blue-600', link: '/admin/orders' },
                                { label: 'Active Queue', value: analytics?.ordersByStatus?.find(s => s._id === 'Processing')?.count || 0, icon: Clock, color: 'bg-amber-50 text-amber-600', link: '/admin/orders' },
                                { label: 'Client Base', value: analytics?.customers.total || 0, icon: Users, color: 'bg-purple-50 text-purple-600', link: '/admin/customers' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => router.push(item.link)}
                                    className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all group/item active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${item.color} group-hover/item:scale-110 transition-transform shadow-sm`}>
                                            <item.icon size={20} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <span className="font-black text-2xl text-slate-900 tabular-nums">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-blue-500/30 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] -ml-16 -mb-16"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <Activity size={24} className="text-blue-400" />
                            </div>
                            <h4 className="font-black text-2xl mb-3 tracking-tight">Need Support?</h4>
                            <p className="text-slate-400 text-xs mb-8 leading-relaxed font-bold">Access advanced logistics configurations and system documentation in the resource center.</p>
                            <button className="w-full py-4 bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/5">
                                Resource Center
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
