'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, logout } from '../../../redux/actions/userActions';
import AdminSidebar from './AdminSidebar';
import { io } from 'socket.io-client';
import {
    Bell,
    User,
    Search,
    LogOut,
    Settings,
    Menu,
    X,
    Clock,
    Camera,
    Lock,
    Save,
    Shield,
    MessageSquare,
    ShoppingCart
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Auth Check
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            router.push('/admin/login');
        }
    }, [userInfo, router]);

    // Time State
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Dropdown States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Profile Form State
    const [profileMode, setProfileMode] = useState('details'); // details, edit, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updateSuccess, loading: updateLoading } = userUpdateProfile;

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.firstName || userInfo.name.split(' ')[0] || '');
            setLastName(userInfo.lastName || userInfo.name.split(' ').slice(1).join(' ') || '');
            setEmail(userInfo.email || '');
        }
    }, [userInfo]);

    useEffect(() => {
        if (updateSuccess) {
            setProfileMode('details');
            setMessage(null);
            setPassword('');
            setConfirmPassword('');
        }
    }, [updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);

        if (profileMode === 'password') {
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
                return;
            }
            dispatch(updateUserProfile({ id: userInfo._id, password }));
        } else {
            dispatch(updateUserProfile({ id: userInfo._id, firstName, lastName, email }));
        }
    };

    // Notifications State
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);

    // Socket Initialization
    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_API_URL);
        setSocket(newSocket);

        newSocket.on('newOrder', (order) => {
            setNotifications(prev => [{
                id: Date.now(),
                type: 'order',
                message: `New Order #${order._id.slice(-6)}`,
                time: 'Just now',
                read: false
            }, ...prev]);
        });

        newSocket.on('newChat', (chat) => {
            setNotifications(prev => [{
                id: Date.now(),
                type: 'chat',
                message: `New message from ${chat.senderName}`,
                time: 'Just now',
                read: false
            }, ...prev]);
        });

        return () => newSocket.close();
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className="admin-dashboard-layout">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="mobile-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <AdminSidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen}
                activePath={pathname}
            />

            {/* Main Content */}
            <div className="admin-main-wrapper">
                {/* Header */}
                <header className="admin-header">
                    <div className="header-left">
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search for something..." />
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="admin-clock">
                            <Clock size={16} />
                            <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {/* Notifications */}
                        <div className="header-icon-dropdown">
                            <button 
                                className={`icon-btn ${notifications.some(n => !n.read) ? 'has-badge' : ''}`}
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                            >
                                <Bell size={20} />
                            </button>
                            {isNotifOpen && (
                                <div className="dropdown-panel notif-panel">
                                    <div className="dropdown-header">
                                        <h4>Notifications</h4>
                                        <span>{notifications.filter(n => !n.read).length} New</span>
                                    </div>
                                    <div className="dropdown-body">
                                        {notifications.length > 0 ? (
                                            notifications.map(n => (
                                                <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                                                    <div className="notif-icon">
                                                        {n.type === 'order' ? <ShoppingCart size={16} /> : <MessageSquare size={16} />}
                                                    </div>
                                                    <div className="notif-content">
                                                        <p>{n.message}</p>
                                                        <span>{n.time}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="empty-msg">No new notifications</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="header-profile-dropdown">
                            <button 
                                className="profile-btn"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <div className="avatar-small">
                                    {userInfo?.name?.charAt(0)}
                                </div>
                                <span>{userInfo?.name?.split(' ')[0]}</span>
                            </button>
                            {isProfileOpen && (
                                <div className="dropdown-panel profile-panel">
                                    <div className="profile-info-panel">
                                        <div className="avatar-large">
                                            {userInfo?.name?.charAt(0)}
                                        </div>
                                        <h4>{userInfo?.name}</h4>
                                        <p>{userInfo?.email}</p>
                                    </div>
                                    <div className="dropdown-links">
                                        <button onClick={() => { setIsProfileModalOpen(true); setIsProfileOpen(false); }}>
                                            <User size={16} /> Profile Settings
                                        </button>
                                        <button onClick={logoutHandler} className="logout-btn">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content-area">
                    {children}
                </main>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-profile-modal">
                        <div className="modal-header">
                            <h3>Admin Profile Settings</h3>
                            <button onClick={() => setIsProfileModalOpen(false)}><X size={20} /></button>
                        </div>
                        
                        <div className="modal-tabs">
                            <button 
                                className={profileMode === 'details' ? 'active' : ''} 
                                onClick={() => setProfileMode('details')}
                            >
                                <User size={16} /> Basic Info
                            </button>
                            <button 
                                className={profileMode === 'password' ? 'active' : ''} 
                                onClick={() => setProfileMode('password')}
                            >
                                <Lock size={16} /> Security
                            </button>
                        </div>

                        <form onSubmit={submitHandler} className="modal-form">
                            {message && <div className="alert error">{message}</div>}
                            
                            {profileMode === 'details' ? (
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input 
                                            type="text" 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input 
                                            type="text" 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group full">
                                        <label>Email Address</label>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input 
                                            type="password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input 
                                            type="password" 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="modal-footer">
                                <button type="button" onClick={() => setIsProfileModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn" disabled={updateLoading}>
                                    {updateLoading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            const newSocket = io(process.env.NEXT_PUBLIC_API_URL.replace('/api', ''), {
                auth: { token: userInfo.token }
            });
            setSocket(newSocket);

            newSocket.on('new-order', (data) => {
                setNotifications(prev => [{ ...data, read: false }, ...prev]);
            });

            newSocket.on('new-user', (data) => {
                setNotifications(prev => [{ ...data, read: false }, ...prev]);
            });

            newSocket.on('new-chat', (data) => {
                setNotifications(prev => [{ ...data, read: false }, ...prev]);
            });

            return () => newSocket.close();
        }
    }, [userInfo]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotifClick = (path, id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
        router.push(path);
        setIsNotifOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    };

    const openProfileModal = () => {
        setIsProfileOpen(false);
        setIsProfileModalOpen(true);
        setProfileMode('details');
    };

    if (!userInfo || !userInfo.isAdmin) return null;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 relative">
                    {/* Left: Menu Toggle (Mobile) & Clock */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="hidden md:flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            <Clock size={14} />
                            <span className="text-xs font-semibold font-mono">
                                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                                className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                                        <span className="text-xs text-blue-600 font-medium cursor-pointer">Mark all read</span>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? notifications.map(notif => (
                                            <div
                                                key={notif.id}
                                                onClick={() => handleNotifClick(notif.path, notif.id)}
                                                className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                                                <div>
                                                    <p className="text-sm text-slate-700 leading-tight">{notif.message}</p>
                                                    <span className="text-xs text-slate-400 mt-1 block">{notif.time instanceof Date ? notif.time.toLocaleTimeString() : notif.time}</span>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                                        )}
                                    </div>
                                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                                        <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true })))} className="text-xs font-bold text-slate-500 hover:text-slate-800">Mark All Read</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase shadow-inner">
                                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                </div>
                                <span className="hidden sm:block text-xs font-bold text-slate-700">{userInfo.firstName || userInfo.name}</span>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50 text-center">
                                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 uppercase">
                                            {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                        </div>
                                        <h4 className="font-bold text-slate-900 truncate">{userInfo.name}</h4>
                                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Administrator</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button onClick={openProfileModal} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                                            <User size={16} /> Manage Profile
                                        </button>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <Outlet />
                </main>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-900 px-6 py-8 text-white relative">
                            <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mb-4 border-4 border-white/20 uppercase">
                                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                </div>
                                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                                <p className="text-slate-400 text-sm mt-1">{userInfo.email}</p>
                                <span className="mt-4 px-4 py-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full border border-blue-500/30 uppercase tracking-widest">
                                    Super Administrator
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            {message && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-2">
                                    <Shield size={14} />
                                    {message}
                                </div>
                            )}

                            {profileMode === 'details' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-[10px] text-slate-400 uppercase font-black block mb-1 tracking-tighter">Full Name</span>
                                            <span className="font-bold text-slate-900">{userInfo.firstName + ' ' + userInfo.lastName || userInfo.name}</span>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-[10px] text-slate-400 uppercase font-black block mb-1 tracking-tighter">Account Status</span>
                                            <span className="font-bold text-emerald-600 flex items-center gap-1"><Shield size={12} /> Active</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => setProfileMode('edit')}
                                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                                        >
                                            <Settings size={18} /> Manage Profile
                                        </button>
                                        <button
                                            onClick={() => setProfileMode('password')}
                                            className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Lock size={18} /> Change Password
                                        </button>
                                        <button
                                            onClick={() => setIsProfileModalOpen(false)}
                                            className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-all"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}

                            {profileMode === 'edit' && (
                                <form onSubmit={submitHandler} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 uppercase font-bold ml-1">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 uppercase font-bold ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setProfileMode('details')}
                                            className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                        >
                                            {updateLoading ? 'Updating...' : <><Save size={18} /> Update Profile</>}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {profileMode === 'password' && (
                                <form onSubmit={submitHandler} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold ml-1">New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-400 uppercase font-bold ml-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setProfileMode('details')}
                                            className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                                        >
                                            {updateLoading ? 'Updating...' : <><Lock size={18} /> Update Password</>}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;

