'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Bell, 
    Search, 
    Menu, 
    User, 
    LogOut, 
    Settings,
    ShoppingCart,
    MessageSquare,
    Clock,
    X,
    ChevronDown,
    Calendar,
    LayoutDashboard
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { logout } from '@/redux/actions/userActions';
import '@/app/globals.css';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    const prevOrderCountRef = useRef(0);
    const prevChatCountRef = useRef(0);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/admin/login');
        }


        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

        const fetchNotifications = async () => {
            try {
                const headers = { Authorization: `Bearer ${userInfo.token}` };

                // Orders
                const ordersRes = await fetch(`${baseUrl}/orders?fetchAll=true`, { headers });
                if (ordersRes.ok) {
                    const orderData = await ordersRes.json();
                    const orderCount = orderData.count ?? (orderData.orders ? orderData.orders.length : 0);
                    if (prevOrderCountRef.current === 0) {
                        prevOrderCountRef.current = orderCount;
                    } else if (orderCount > prevOrderCountRef.current) {
                        prevOrderCountRef.current = orderCount;
                        const newest = orderData.orders && orderData.orders[0];
                        if (newest) {
                            setNotifications(prev => [{
                                id: Date.now(),
                                type: 'order',
                                message: `New Order #${(newest._id || '').slice(-6)}`,
                                time: 'Just now',
                                read: false
                            }, ...prev]);
                        }
                    }
                }

                // Chats
                const chatsRes = await fetch(`${baseUrl}/chats`, { headers });
                if (chatsRes.ok) {
                    const chatsData = await chatsRes.json();
                    const chatsCount = Array.isArray(chatsData) ? chatsData.length : (chatsData.count || 0);
                    if (prevChatCountRef.current === 0) {
                        prevChatCountRef.current = chatsCount;
                    } else if (chatsCount > prevChatCountRef.current) {
                        prevChatCountRef.current = chatsCount;
                        const newestChat = Array.isArray(chatsData) ? chatsData[0] : null;
                        setNotifications(prev => [{
                            id: Date.now(),
                            type: 'chat',
                            message: `New message from ${newestChat?.user?.name || 'User'}`,
                            time: 'Just now',
                            read: false
                        }, ...prev]);
                    }
                }
            } catch (err) {
                console.error('Notification polling error:', err);
            }
        };

        // initial fetch and start polling
        fetchNotifications();
        const pollId = setInterval(fetchNotifications, 5000);

        return () => {
            clearInterval(timer);
            clearInterval(pollId);
        };
    }, [userInfo, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    };

    if (!mounted || !userInfo || !userInfo.isAdmin) return null;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-100">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Enhanced Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-40 relative">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
                        >
                            <Menu size={22} />
                        </button>
                        
                        {/* Status/Clock Display */}
                        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600">
                            <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
                                <Calendar size={14} className="text-blue-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-blue-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Quick Search */}
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search analytics..." 
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                                className={`p-2.5 rounded-xl transition-all relative group ${isNotifOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                                {notifications.some(n => !n.read) && (
                                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                                )}
                            </button>

                            {isNotifOpen && (
                                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                        <div>
                                            <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest">Activity</h4>
                                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Real-time system updates</p>
                                        </div>
                                        <span className="text-[10px] font-black bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg shadow-blue-600/20">
                                            {notifications.filter(n => !n.read).length} NEW
                                        </span>
                                    </div>
                                    <div className="max-h-[30rem] overflow-y-auto custom-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map(n => (
                                                <div key={n.id} className="p-5 border-b border-slate-50 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${n.type === 'order' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {n.type === 'order' ? <ShoppingCart size={20} /> : <MessageSquare size={20} />}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{n.message}</p>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{n.time}</span>
                                                    </div>
                                                    {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto mt-2"></div>}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-16 text-center space-y-4">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                                    <Bell size={32} className="text-slate-200" />
                                                </div>
                                                <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">No new alerts</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:tracking-[0.2em] transition-all">Clear All Notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-[1.25rem] transition-all group active:scale-95"
                            >
                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
                                    {userInfo.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:block text-left pr-2">
                                    <p className="text-xs font-black text-slate-900 leading-none">{userInfo.name.split(' ')[0]}</p>
                                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1.5">Administrator</p>
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="p-8 border-b border-slate-50 bg-slate-50/50 text-center">
                                        <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-xl shadow-slate-900/20">
                                            {userInfo.name.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="text-sm font-black text-slate-900">{userInfo.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{userInfo.email}</p>
                                    </div>
                                    <div className="p-3">
                                        {[
                                            { label: 'Profile Settings', icon: User, action: () => router.push('/admin/settings') },
                                            { label: 'System Logs', icon: LayoutDashboard, action: () => router.push('/admin/analytics') },
                                            { label: 'Security', icon: Settings, action: () => router.push('/admin/settings') },
                                        ].map((item, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => { item.action(); setIsProfileOpen(false); }}
                                                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all font-bold text-xs group"
                                            >
                                                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                                                {item.label}
                                            </button>
                                        ))}
                                        <div className="h-px bg-slate-50 my-2 mx-4"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-4 px-5 py-5 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-[0.2em]"
                                        >
                                            <LogOut size={18} />
                                            Terminate Session
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-slate-50/50">
                    <div className="max-w-[100rem] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
