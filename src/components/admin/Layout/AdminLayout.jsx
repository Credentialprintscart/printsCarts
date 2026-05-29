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
                                    <div className="dropdown-footer">
                                        <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true })))} className="text-xs font-bold text-slate-500 hover:text-slate-800">Mark All Read</button>
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
